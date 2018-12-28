pragma solidity ^0.4.21;

contract Simplelease {
    // 出租的参数。
    address public beneficiary;
    // 时间是unix的绝对时间戳（自1970-01-01以来的秒数）
    // 或以秒为单位的时间段。
    uint public leaseTime;
    string public place;
    uint public leaseStart;
    uint public leaseEnd;

    // 出租的当前状态
    address public tenant;
    uint public tenantBid;

    //可以取回的之前的出价
    mapping(address => uint) pendingReturns;

    // 出租结束后设为 true，将禁止所有的变更
    bool ended;

    // 变更触发的事件
    event BidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // 以下是所谓的 natspec 注释，可以通过三个斜杠来识别。
    // 当用户被要求确认交易时将显示。

    /// 以受益者地址 `_beneficiary` 的名义，
    /// 创建一个简单的出租，出租时间为从 `now + _leasestartTime` 到 `now + _leaseendTime` 秒。
    function SimpleAuction(
        uint _leaseTime,
        string _place,
        uint _leaseStart,
        uint _leaseEnd
    ) public {
        leaseTime = now + _leaseTime;
        place = _place;
        beneficiary = msg.sender;
        leaseStart = now + _leaseStart;
        leaseEnd = now + _leaseEnd;
    }

    /// 对租车位进行出价，具体的出价随交易一起发送。
    /// 如果没有租到，则返还出价。
    function bid() public payable {
        // 参数不是必要的。因为所有的信息已经包含在了交易中。
        // 对于能接收以太币的函数，关键字 payable 是必须的。

        // 如果出租已结束，撤销函数的调用。
        // 如果有人已经出价，撤销函数的调用。
        require(now <= leaseEnd);
        require(tenantBid == 0);
        require(!ended); 

        tenant = msg.sender;
        tenantBid = msg.value;
        emit BidIncreased(msg.sender, msg.value);
    }
    
    /// 拒绝出价
    function refuse(uint price) public payable {
        require(tenantBid != 0);
        require(beneficiary == msg.sender);
        require(!ended); 
        
        if (tenantBid <= price) {
            pendingReturns[tenant] += tenantBid;
            tenant = 0;
            tenantBid = 0;
        }
    }

    /// 取回出价（当该出价被拒绝）
    function withdraw() public returns (bool) {
        require(pendingReturns[msg.sender] != 0);
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // 这里很重要，首先要设零值。
            // 因为，作为接收调用的一部分，
            // 接收者可以在 `send` 返回之前，重新调用该函数。
            pendingReturns[msg.sender] = 0;

            if (!msg.sender.send(amount)) {
                // 这里不需抛出异常，只需重置未付款
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    /// 结束出租，并把出价发送给受益人
    function auctionEnd() public {
        // 对于可与其他合约交互的函数（意味着它会调用其他函数或发送以太币），
        // 一个好的指导方针是将其结构分为三个阶段：
        // 1. 检查条件
        // 2. 执行动作 (可能会改变条件)
        // 3. 与其他合约交互
        // 如果这些阶段相混合，其他的合约可能会回调当前合约并修改状态，
        // 或者导致某些效果（比如支付以太币）多次生效。
        // 如果合约内调用的函数包含了与外部合约的交互，
        // 则它也会被认为是与外部合约有交互的。

        // 1. 条件
        require(beneficiary == msg.sender);//合约建立者才能停止
        require(tenantBid != 0); // 出租尚未结束
        require(!ended); // 该函数已被调用

        // 2. 生效
        ended = true;
        tenant = 0;
        tenantBid = 0;
        emit AuctionEnded(tenant, tenantBid);

        // 3. 交互
        beneficiary.transfer(tenantBid);
    }
}
