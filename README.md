# Block-chain

## 使用说明
1. 首先运行私有链，以便对合约通过挖矿进行有效行证明，注意在运行私有链时要加入一定的参数
 geth --datadir data0 --networkid 10 --port 30301 --rpcport 8486 -rpc --rpccorsdomain "*" console --rpcapi web3,eth,net,personal
 - --networkid : 与 genesis.json 中的 chainId 一致
 - --datadir : 存放数据的目录
 - --rpc : 启用 rpc 服务
 - --rpcport : rpc 服务端口
 - --port : geth 节点端口
 - --rpccorsdomain "*" ：如果从浏览器访问要启用相应的域集，否则JS调用会受到同源策略的限制导致		请求失败
 - --rpcapi web3,eth,net,personal ：指定需要调用的HTTP-RPC API接口，默认只有	eth，net，web3，在实验中使用了personal需要指明
2. 运行lease.html，就可以打开浏览器进行使用，在本次实验中使用的是8486端口，如果更改端口需要在contract.js中修改
3. 登录可以使用已有用户的地址和密码，也可以新建用户，在登录时选择lease即为出租停车位，选择tenant则为租用他人停车位


