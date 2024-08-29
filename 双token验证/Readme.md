### JWT

- access_token => 用来做访问API的权限验证
- refresh_token => 是在access_token过期以后, 刷新获取新的access_token

1. 唯一的key => secretKey
2. 需要一些额外的信息 => { uid nickname role } => payload
2. 过期时间 => at exp过期时间 < rt exp过期时间