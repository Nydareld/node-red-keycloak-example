# NodeRed Keycloak example

This is an exemple to use [node-red-contrib-openid](https://flows.nodered.org/node/node-red-contrib-openid) node-red module to connect to keycloak.

## Requirements

 + docker
 + docker-compose

## Installation

 + Run the docker environement

    docker-compose up -d

 + Import the realm in [keycloak](http://localhost:8080/auth)
 + Import the redway flow
 + configure your openIdConnect block with you keycloak client configuration

```json
{
    "client-id" : "redway",
    "client-secret" : "your client secret fond in credential in keyclaok",
    "discovery-url" : "http://keycloak:8080/auth/realms/master/.well-known/openid-configuration"
}
```
