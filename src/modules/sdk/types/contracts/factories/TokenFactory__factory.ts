/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TokenFactory, TokenFactoryInterface } from "../TokenFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "contractURI",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalSupplyCap",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "permissions",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct ITERC20.ConstructorParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "DeployedTERC20",
    type: "event",
  },
  {
    inputs: [],
    name: "CREATE_PERMISSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EXECUTE_PERMISSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_FACTORY_RESOURCE",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_REGISTRY_DEP",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "countTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "contractURI",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalSupplyCap",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "permissions",
            type: "uint8",
          },
        ],
        internalType: "struct ITERC20.ConstructorParams",
        name: "params_",
        type: "tuple",
      },
    ],
    name: "deployTERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInjector",
    outputs: [
      {
        internalType: "address",
        name: "injector_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
    ],
    name: "isTokenExist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "limit_",
        type: "uint256",
      },
    ],
    name: "listTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "contractURI",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "decimals",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalSupplyCap",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "permissions",
            type: "uint8",
          },
        ],
        internalType: "struct ITERC20.ConstructorParams",
        name: "params_",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "description_",
        type: "string",
      },
    ],
    name: "requestTERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "registryAddress_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "setDependencies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "injector_",
        type: "address",
      },
    ],
    name: "setInjector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612128806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620000e05760003560e01c80638cb941cc1162000097578063d9563424116200006e578063d95634241462000232578063e30e5ae91462000260578063ea7084d01462000277578063f74ec153146200028e57600080fd5b80638cb941cc14620001ce578063b3e657fb14620001e5578063bcfa4784146200020b57600080fd5b80632346c24d14620000e55780633e3b5b1914620001335780633fc422e5146200015d578063622ae7aa146200018557806369130451146200019e578063781babb114620001b7575b600080fd5b6200011b60405180604001604052806016815260200175544f4b454e5f464143544f52595f5245534f5552434560501b81525081565b6040516200012a91906200108a565b60405180910390f35b600080516020620020d3833981519152546040516001600160a01b0390911681526020016200012a565b620001746200016e366004620010b5565b620002a7565b60405190151581526020016200012a565b6200018f620002bc565b6040516200012a9190620010d5565b620001b5620001af36600462001170565b620002cf565b005b620001b5620001c8366004620011e4565b6200049f565b620001b5620001df366004620010b5565b62000652565b6200011b6040518060400160405280600681526020016543524541544560d01b81525081565b6200011b604051806040016040528060078152602001664558454355544560c81b81525081565b6200011b6040518060400160405280600e81526020016d544f4b454e5f524547495354525960901b81525081565b6200018f6200027136600462001225565b62000677565b620001b56200028836600462001248565b6200068e565b620002986200077a565b6040519081526020016200012a565b6000620002b660048362000788565b92915050565b6060620002ca6004620007ab565b905090565b620002dc838383620007ba565b6000839050806001600160a01b031663085ec2976040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000320573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620003469190620012ab565b600160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550806001600160a01b03166370371abb6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620003ab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620003d19190620012ab565b600280546001600160a01b0319166001600160a01b03928316179055604080518082018252600e81526d544f4b454e5f524547495354525960901b60208201529051633581777360e01b81529183169163358177739162000435916004016200108a565b602060405180830381865afa15801562000453573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620004799190620012ab565b600380546001600160a01b0319166001600160a01b039290921691909117905550505050565b620004c9604051806040016040528060078152602001664558454355544560c81b815250620007f6565b600354604080516206d7e760e91b815290516000926001600160a01b031691630dafce0091600480830192869291908290030181865afa15801562000512573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526200053c9190810190620012e1565b6003549091506000906200055a906001600160a01b031683620008ec565b905060006200056a8383620009ae565b604051630b9fa2b360e41b81529091506001600160a01b0383169063b9fa2b30906200059d9087908590600401620014d8565b600060405180830381600087803b158015620005b857600080fd5b505af1158015620005cd573d6000803e3d6000fd5b5050600354620005eb92506001600160a01b031690508484620009f1565b60035462000603906001600160a01b03168362000aff565b7fcd6be2071743d630d03a64056882a8795b73122861b36265df63c810448f70138285604051620006369291906200150a565b60405180910390a16200064b60048362000bd3565b5050505050565b6200065c62000bea565b6200067481600080516020620020d383398151915255565b50565b6060620006876004848462000c73565b9392505050565b620006b76040518060400160405280600681526020016543524541544560d01b815250620007f6565b600063781babb160e01b84604051602401620006d4919062001530565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092526002549151633ffa750960e01b81529092506001600160a01b0390911690633ffa7509906200074090309085908890889060040162001545565b600060405180830381600087803b1580156200075b57600080fd5b505af115801562000770573d6000803e3d6000fd5b5050505050505050565b6000620002ca600462000d51565b6001600160a01b0381166000908152600183016020526040812054151562000687565b60606000620006878362000d5c565b620007c462000bea565b600080546001600160a01b0319166001600160a01b03851617905533600080516020620020d383398151915255505050565b6001546040805180820182526016815275544f4b454e5f464143544f52595f5245534f5552434560501b60208201529051633ca8e36d60e11b81526001600160a01b0390921691637951c6da9162000856913391908690600401620015b1565b602060405180830381865afa15801562000874573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200089a9190620015f5565b620006745760405162461bcd60e51b815260206004820152601b60248201527f546f6b656e466163746f72793a206163636573732064656e696564000000000060448201526064015b60405180910390fd5b60405163c21182e760e01b81526000906001600160a01b0384169063c21182e7906200091d9085906004016200108a565b602060405180830381865afa1580156200093b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620009619190620012ab565b604080516020810182526000815290516200097c9062001028565b6200098992919062001619565b604051809103906000f080158015620009a6573d6000803e3d6000fd5b509392505050565b606082620009c76001600160a01b038416601462000dba565b604051602001620009da9291906200163f565b604051602081830303815290604052905092915050565b6000836001600160a01b0316838360405160240162000a129291906200167f565b60408051601f198184030181529181526020820180516001600160e01b03166309ae152b60e01b1790525162000a499190620016ab565b6000604051808303816000865af19150503d806000811462000a88576040519150601f19603f3d011682016040523d82523d6000602084013e62000a8d565b606091505b505090508062000af95760405162461bcd60e51b815260206004820152603060248201527f4162737472616374506f6f6c466163746f72793a206661696c656420746f207260448201526f1959da5cdd195c8818dbdb9d1c9858dd60821b6064820152608401620008e3565b50505050565b600080546040805160208101825292835251636913045160e01b81526001600160a01b038085169363691304519362000b3e9392169160040162001619565b600060405180830381600087803b15801562000b5957600080fd5b505af115801562000b6e573d6000803e3d6000fd5b505060405163232e507360e21b81526001600160a01b03858116600483015284169250638cb941cc9150602401600060405180830381600087803b15801562000bb657600080fd5b505af115801562000bcb573d6000803e3d6000fd5b505050505050565b600062000687836001600160a01b03841662000f74565b600062000c04600080516020620020d38339815191525490565b90506001600160a01b038116158062000c2557506001600160a01b03811633145b620006745760405162461bcd60e51b815260206004820152601a60248201527f446570656e64616e743a206e6f7420616e20696e6a6563746f720000000000006044820152606401620008e3565b6060600062000c8e62000c868662000d51565b858562000fc6565b905062000c9c8482620016df565b67ffffffffffffffff81111562000cb75762000cb7620012cb565b60405190808252806020026020018201604052801562000ce1578160200160208202803683370190505b509150835b8181101562000d485762000cfb868262000ff3565b8362000d088784620016df565b8151811062000d1b5762000d1b620016f5565b6001600160a01b03909216602092830291909101909101528062000d3f816200170b565b91505062000ce6565b50509392505050565b6000620002b6825490565b60608160000180548060200260200160405190810160405280929190818152602001828054801562000dae57602002820191906000526020600020905b81548152602001906001019080831162000d99575b50505050509050919050565b6060600062000dcb83600262001727565b62000dd890600262001741565b67ffffffffffffffff81111562000df35762000df3620012cb565b6040519080825280601f01601f19166020018201604052801562000e1e576020820181803683370190505b509050600360fc1b8160008151811062000e3c5762000e3c620016f5565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811062000e6e5762000e6e620016f5565b60200101906001600160f81b031916908160001a905350600062000e9484600262001727565b62000ea190600162001741565b90505b600181111562000f23576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811062000ed95762000ed9620016f5565b1a60f81b82828151811062000ef25762000ef2620016f5565b60200101906001600160f81b031916908160001a90535060049490941c9362000f1b8162001757565b905062000ea4565b508315620006875760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401620008e3565b600081815260018301602052604081205462000fbd57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620002b6565b506000620002b6565b600062000fd4828462001741565b90508381111562000fe25750825b808311156200068757509092915050565b60006200068783836000826000018281548110620010155762001015620016f5565b9060005260206000200154905092915050565b610961806200177283390190565b60005b838110156200105357818101518382015260200162001039565b50506000910152565b600081518084526200107681602086016020860162001036565b601f01601f19169290920160200192915050565b6020815260006200068760208301846200105c565b6001600160a01b03811681146200067457600080fd5b600060208284031215620010c857600080fd5b813562000687816200109f565b6020808252825182820181905260009190848201906040850190845b81811015620011185783516001600160a01b031683529284019291840191600101620010f1565b50909695505050505050565b60008083601f8401126200113757600080fd5b50813567ffffffffffffffff8111156200115057600080fd5b6020830191508360208285010111156200116957600080fd5b9250929050565b6000806000604084860312156200118657600080fd5b833562001193816200109f565b9250602084013567ffffffffffffffff811115620011b057600080fd5b620011be8682870162001124565b9497909650939450505050565b600060c08284031215620011de57600080fd5b50919050565b600060208284031215620011f757600080fd5b813567ffffffffffffffff8111156200120f57600080fd5b6200121d84828501620011cb565b949350505050565b600080604083850312156200123957600080fd5b50508035926020909101359150565b6000806000604084860312156200125e57600080fd5b833567ffffffffffffffff808211156200127757600080fd5b6200128587838801620011cb565b945060208601359150808211156200129c57600080fd5b50620011be8682870162001124565b600060208284031215620012be57600080fd5b815162000687816200109f565b634e487b7160e01b600052604160045260246000fd5b600060208284031215620012f457600080fd5b815167ffffffffffffffff808211156200130d57600080fd5b818401915084601f8301126200132257600080fd5b815181811115620013375762001337620012cb565b604051601f8201601f19908116603f01168101908382118183101715620013625762001362620012cb565b816040528281528760208487010111156200137c57600080fd5b6200138f83602083016020880162001036565b979650505050505050565b6000808335601e19843603018112620013b257600080fd5b830160208101925035905067ffffffffffffffff811115620013d357600080fd5b8036038213156200116957600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b803560ff811681146200141e57600080fd5b919050565b60006200143182836200139a565b60c085526200144560c086018284620013e3565b9150506200145760208401846200139a565b85830360208701526200146c838284620013e3565b925050506200147f60408401846200139a565b858303604087015262001494838284620013e3565b9250505060ff620014a8606085016200140c565b1660608501526080830135608085015260ff620014c860a085016200140c565b1660a08501528091505092915050565b604081526000620014ed604083018562001423565b82810360208401526200150181856200105c565b95945050505050565b6001600160a01b03831681526040602082018190526000906200121d9083018462001423565b60208152600062000687602083018462001423565b6001600160a01b038516815260a0602082018190526000906200156b908301866200105c565b82810380604085015260008252602081016060850152600660208301526505445524332360d41b6040830152606081016080850152506200138f606082018587620013e3565b6001600160a01b0384168152606060208201819052600090620015d7908301856200105c565b8281036040840152620015eb81856200105c565b9695505050505050565b6000602082840312156200160857600080fd5b815180151581146200068757600080fd5b6001600160a01b03831681526040602082018190526000906200121d908301846200105c565b600083516200165381846020880162001036565b601d60f91b90830190815283516200167381600184016020880162001036565b01600101949350505050565b6040815260006200169460408301856200105c565b905060018060a01b03831660208301529392505050565b60008251620016bf81846020870162001036565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b81810381811115620002b657620002b6620016c9565b634e487b7160e01b600052603260045260246000fd5b600060018201620017205762001720620016c9565b5060010190565b8082028115828204841417620002b657620002b6620016c9565b80820180821115620002b657620002b6620016c9565b600081620017695762001769620016c9565b50600019019056fe60806040526040516109613803806109618339810160408190526100229161045f565b818161003082826000610039565b50505050610589565b61004283610104565b6040516001600160a01b038416907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a26000825111806100835750805b156100ff576100fd836001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ed919061051f565b836102a760201b61008b1760201c565b505b505050565b610117816102d360201b6100b71760201c565b6101765760405162461bcd60e51b815260206004820152602560248201527f455243313936373a206e657720626561636f6e206973206e6f74206120636f6e6044820152641d1c9858dd60da1b60648201526084015b60405180910390fd5b6101ea816001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101db919061051f565b6102d360201b6100b71760201c565b61024f5760405162461bcd60e51b815260206004820152603060248201527f455243313936373a20626561636f6e20696d706c656d656e746174696f6e206960448201526f1cc81b9bdd08184818dbdb9d1c9858dd60821b606482015260840161016d565b806102867fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5060001b6102e260201b6100c61760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606102cc838360405180606001604052806027815260200161093a602791396102e5565b9392505050565b6001600160a01b03163b151590565b90565b6060600080856001600160a01b031685604051610302919061053a565b600060405180830381855af49150503d806000811461033d576040519150601f19603f3d011682016040523d82523d6000602084013e610342565b606091505b5090925090506103548683838761035e565b9695505050505050565b606083156103cd5782516000036103c6576001600160a01b0385163b6103c65760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161016d565b50816103d7565b6103d783836103df565b949350505050565b8151156103ef5781518083602001fd5b8060405162461bcd60e51b815260040161016d9190610556565b80516001600160a01b038116811461042057600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561045657818101518382015260200161043e565b50506000910152565b6000806040838503121561047257600080fd5b61047b83610409565b60208401519092506001600160401b038082111561049857600080fd5b818501915085601f8301126104ac57600080fd5b8151818111156104be576104be610425565b604051601f8201601f19908116603f011681019083821181831017156104e6576104e6610425565b816040528281528860208487010111156104ff57600080fd5b61051083602083016020880161043b565b80955050505050509250929050565b60006020828403121561053157600080fd5b6102cc82610409565b6000825161054c81846020870161043b565b9190910192915050565b602081526000825180602084015261057581604085016020870161043b565b601f01601f19169190910160400192915050565b6103a2806105986000396000f3fe6080604052600436106100225760003560e01c80635c60da1b1461003957610031565b366100315761002f61006a565b005b61002f61006a565b34801561004557600080fd5b5061004e61007c565b6040516001600160a01b03909116815260200160405180910390f35b61007a6100756100c9565b61015d565b565b60006100866100c9565b905090565b60606100b0838360405180606001604052806027815260200161034660279139610181565b9392505050565b6001600160a01b03163b151590565b90565b60006100fc7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50546001600160a01b031690565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610139573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061008691906102a9565b3660008037600080366000845af43d6000803e80801561017c573d6000f35b3d6000fd5b6060600080856001600160a01b03168560405161019e91906102f6565b600060405180830381855af49150503d80600081146101d9576040519150601f19603f3d011682016040523d82523d6000602084013e6101de565b606091505b50915091506101ef868383876101f9565b9695505050505050565b6060831561026d578251600003610266576001600160a01b0385163b6102665760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b5081610277565b610277838361027f565b949350505050565b81511561028f5781518083602001fd5b8060405162461bcd60e51b815260040161025d9190610312565b6000602082840312156102bb57600080fd5b81516001600160a01b03811681146100b057600080fd5b60005b838110156102ed5781810151838201526020016102d5565b50506000910152565b600082516103088184602087016102d2565b9190910192915050565b60208152600082518060208401526103318160408501602087016102d2565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c4a329c2874d0cd83647ae1ed74363be7350808c90c0eccddadd4911808e55b764736f6c63430008110033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c65643d1f25f1ac447e55e7fec744471c4dab1c6a2b6ffb897825f9ea3d2e8c9be583a26469706673582212205a5a4516aae1fa65da522ed77007fbdcd94d0cb25973a3f35e7ada475a74e43b64736f6c63430008110033";

type TokenFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenFactory__factory extends ContractFactory {
  constructor(...args: TokenFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<TokenFactory> {
    return super.deploy(overrides || {}) as Promise<TokenFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TokenFactory {
    return super.attach(address) as TokenFactory;
  }
  override connect(signer: Signer): TokenFactory__factory {
    return super.connect(signer) as TokenFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenFactoryInterface {
    return new utils.Interface(_abi) as TokenFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenFactory {
    return new Contract(address, _abi, signerOrProvider) as TokenFactory;
  }
}
