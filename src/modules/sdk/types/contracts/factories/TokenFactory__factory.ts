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
            internalType: "string",
            name: "baseURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupplyCap",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct ITERC721.ConstructorParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "DeployedTERC721",
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
            internalType: "string",
            name: "baseURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupplyCap",
            type: "uint256",
          },
        ],
        internalType: "struct ITERC721.ConstructorParams",
        name: "params_",
        type: "tuple",
      },
    ],
    name: "deployTERC721",
    outputs: [],
    stateMutability: "nonpayable",
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
            internalType: "string",
            name: "baseURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupplyCap",
            type: "uint256",
          },
        ],
        internalType: "struct ITERC721.ConstructorParams",
        name: "params_",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "description_",
        type: "string",
      },
    ],
    name: "requestTERC721",
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
  "0x608060405234801561001057600080fd5b50612111806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620000b75760003560e01c806375c7c656116200007a57806375c7c656146200017b5780638cb941cc1462000192578063b3e657fb14620001a9578063bcfa478414620001cf578063d956342414620001f6578063dae14dd6146200022457600080fd5b80631d70f02714620000bc5780632346c24d14620000d55780633e3b5b1914620001235780634c1c60e2146200014d578063691304511462000164575b600080fd5b620000d3620000cd36600462000fe3565b6200023b565b005b6200010b60405180604001604052806016815260200175544f4b454e5f464143544f52595f5245534f5552434560501b81525081565b6040516200011a9190620010a7565b60405180910390f35b600080516020620020bc833981519152546040516001600160a01b0390911681526020016200011a565b620000d36200015e366004620010bc565b62000327565b620000d36200017536600462001113565b620004cc565b620000d36200018c36600462000fe3565b6200069c565b620000d3620001a336600462001161565b6200074e565b6200010b6040518060400160405280600681526020016543524541544560d01b81525081565b6200010b604051806040016040528060078152602001664558454355544560c81b81525081565b6200010b6040518060400160405280600e81526020016d544f4b454e5f524547495354525960901b81525081565b620000d362000235366004620010bc565b62000773565b620002646040518060400160405280600681526020016543524541544560d01b8152506200090b565b6000634c1c60e260e01b8460405160240162000281919062001296565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092526002549151633ffa750960e01b81529092506001600160a01b0390911690633ffa750990620002ed903090859088908890600401620012ab565b600060405180830381600087803b1580156200030857600080fd5b505af11580156200031d573d6000803e3d6000fd5b5050505050505050565b62000351604051806040016040528060078152602001664558454355544560c81b8152506200090b565b600354604080516206d7e760e91b815290516000926001600160a01b031691630dafce0091600480830192869291908290030181865afa1580156200039a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052620003c4919081019062001338565b600354909150600090620003e2906001600160a01b03168362000a01565b90506000620003f2838362000ac5565b604051636c68698760e11b81529091506001600160a01b0383169063d8d0d30e90620004259087908590600401620013e6565b600060405180830381600087803b1580156200044057600080fd5b505af115801562000455573d6000803e3d6000fd5b50506003546200047392506001600160a01b03169050848462000b08565b6003546200048b906001600160a01b03168362000c16565b7ff4164a0dcf26b9292acf1c47e0e677ab12e5b86d368f6bb5c930c474454d729f8285604051620004be92919062001418565b60405180910390a150505050565b620004d983838362000cea565b6000839050806001600160a01b031663085ec2976040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200051d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200054391906200143e565b600160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550806001600160a01b03166370371abb6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620005a8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620005ce91906200143e565b600280546001600160a01b0319166001600160a01b03928316179055604080518082018252600e81526d544f4b454e5f524547495354525960901b60208201529051633581777360e01b8152918316916335817773916200063291600401620010a7565b602060405180830381865afa15801562000650573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200067691906200143e565b600380546001600160a01b0319166001600160a01b039290921691909117905550505050565b620006c56040518060400160405280600681526020016543524541544560d01b8152506200090b565b600063dae14dd660e01b84604051602401620006e291906200150f565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092526002549151633ffa750960e01b81529092506001600160a01b0390911690633ffa750990620002ed90309085908890889060040162001524565b6200075862000d26565b6200077081600080516020620020bc83398151915255565b50565b6200079d604051806040016040528060078152602001664558454355544560c81b8152506200090b565b60035460408051632594949d60e21b815290516000926001600160a01b031691639652527491600480830192869291908290030181865afa158015620007e7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405262000811919081019062001338565b6003549091506000906200082f906001600160a01b03168362000a01565b905060006200083f838362000ac5565b604051631d913fd360e11b81529091506001600160a01b03831690633b227fa69062000872908790859060040162001591565b600060405180830381600087803b1580156200088d57600080fd5b505af1158015620008a2573d6000803e3d6000fd5b5050600354620008c092506001600160a01b03169050848462000b08565b600354620008d8906001600160a01b03168362000c16565b7f28fd4ea852aed58ec312f0c8cbee4b4961f7595ba1d797e725876b7a109b504a8285604051620004be929190620015a6565b6001546040805180820182526016815275544f4b454e5f464143544f52595f5245534f5552434560501b60208201529051633ca8e36d60e11b81526001600160a01b0390921691637951c6da916200096b913391908690600401620015cc565b602060405180830381865afa15801562000989573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620009af919062001610565b620007705760405162461bcd60e51b815260206004820152601b60248201527f546f6b656e466163746f72793a206163636573732064656e696564000000000060448201526064015b60405180910390fd5b60405163c21182e760e01b81526000906001600160a01b0384169063c21182e79062000a32908590600401620010a7565b602060405180830381865afa15801562000a50573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000a7691906200143e565b6040805160208101825260008152905162000a919062000f70565b62000a9e92919062001634565b604051809103906000f08015801562000abb573d6000803e3d6000fd5b5090505b92915050565b60608262000ade6001600160a01b038416601462000daf565b60405160200162000af19291906200165a565b604051602081830303815290604052905092915050565b6000836001600160a01b0316838360405160240162000b299291906200169a565b60408051601f198184030181529181526020820180516001600160e01b03166309ae152b60e01b1790525162000b609190620016c6565b6000604051808303816000865af19150503d806000811462000b9f576040519150601f19603f3d011682016040523d82523d6000602084013e62000ba4565b606091505b505090508062000c105760405162461bcd60e51b815260206004820152603060248201527f4162737472616374506f6f6c466163746f72793a206661696c656420746f207260448201526f1959da5cdd195c8818dbdb9d1c9858dd60821b6064820152608401620009f8565b50505050565b600080546040805160208101825292835251636913045160e01b81526001600160a01b038085169363691304519362000c559392169160040162001634565b600060405180830381600087803b15801562000c7057600080fd5b505af115801562000c85573d6000803e3d6000fd5b505060405163232e507360e21b81526001600160a01b03858116600483015284169250638cb941cc9150602401600060405180830381600087803b15801562000ccd57600080fd5b505af115801562000ce2573d6000803e3d6000fd5b505050505050565b62000cf462000d26565b600080546001600160a01b0319166001600160a01b03851617905533600080516020620020bc83398151915255505050565b600062000d40600080516020620020bc8339815191525490565b90506001600160a01b038116158062000d6157506001600160a01b03811633145b620007705760405162461bcd60e51b815260206004820152601a60248201527f446570656e64616e743a206e6f7420616e20696e6a6563746f720000000000006044820152606401620009f8565b6060600062000dc0836002620016fa565b62000dcd90600262001714565b67ffffffffffffffff81111562000de85762000de862001322565b6040519080825280601f01601f19166020018201604052801562000e13576020820181803683370190505b509050600360fc1b8160008151811062000e315762000e316200172a565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811062000e635762000e636200172a565b60200101906001600160f81b031916908160001a905350600062000e89846002620016fa565b62000e9690600162001714565b90505b600181111562000f18576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811062000ece5762000ece6200172a565b1a60f81b82828151811062000ee75762000ee76200172a565b60200101906001600160f81b031916908160001a90535060049490941c9362000f108162001740565b905062000e99565b50831562000f695760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401620009f8565b9392505050565b610961806200175b83390190565b600060a0828403121562000f9157600080fd5b50919050565b60008083601f84011262000faa57600080fd5b50813567ffffffffffffffff81111562000fc357600080fd5b60208301915083602082850101111562000fdc57600080fd5b9250929050565b60008060006040848603121562000ff957600080fd5b833567ffffffffffffffff808211156200101257600080fd5b620010208783880162000f7e565b945060208601359150808211156200103757600080fd5b50620010468682870162000f97565b9497909650939450505050565b60005b838110156200107057818101518382015260200162001056565b50506000910152565b600081518084526200109381602086016020860162001053565b601f01601f19169290920160200192915050565b60208152600062000f69602083018462001079565b600060208284031215620010cf57600080fd5b813567ffffffffffffffff811115620010e757600080fd5b620010f58482850162000f7e565b949350505050565b6001600160a01b03811681146200077057600080fd5b6000806000604084860312156200112957600080fd5b83356200113681620010fd565b9250602084013567ffffffffffffffff8111156200115357600080fd5b620010468682870162000f97565b6000602082840312156200117457600080fd5b813562000f6981620010fd565b6000808335601e198436030181126200119957600080fd5b830160208101925035905067ffffffffffffffff811115620011ba57600080fd5b80360382131562000fdc57600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600062001201828362001181565b60a085526200121560a086018284620011ca565b91505062001227602084018462001181565b85830360208701526200123c838284620011ca565b925050506200124f604084018462001181565b858303604087015262001264838284620011ca565b92505050606083013560ff81168082146200127e57600080fd5b60608601525060809283013592909301919091525090565b60208152600062000f696020830184620011f3565b6001600160a01b038516815260a060208201819052600090620012d19083018662001079565b82810380604085015260008252602081016060850152600660208301526505445524332360d41b60408301526060810160808501525062001317606082018587620011ca565b979650505050505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156200134b57600080fd5b815167ffffffffffffffff808211156200136457600080fd5b818401915084601f8301126200137957600080fd5b8151818111156200138e576200138e62001322565b604051601f8201601f19908116603f01168101908382118183101715620013b957620013b962001322565b81604052828152876020848701011115620013d357600080fd5b6200131783602083016020880162001053565b604081526000620013fb6040830185620011f3565b82810360208401526200140f818562001079565b95945050505050565b6001600160a01b0383168152604060208201819052600090620010f590830184620011f3565b6000602082840312156200145157600080fd5b815162000f6981620010fd565b60006200146c828362001181565b60a085526200148060a086018284620011ca565b91505062001492602084018462001181565b8583036020870152620014a7838284620011ca565b92505050620014ba604084018462001181565b8583036040870152620014cf838284620011ca565b92505050620014e2606084018462001181565b8583036060870152620014f7838284620011ca565b92505050608083013560808501528091505092915050565b60208152600062000f6960208301846200145e565b6001600160a01b038516815260a0602082018190526000906200154a9083018662001079565b8281038060408501526000825260208101606085015260076020830152665445524337323160c81b60408301526060810160808501525062001317606082018587620011ca565b604081526000620013fb60408301856200145e565b6001600160a01b0383168152604060208201819052600090620010f5908301846200145e565b6001600160a01b0384168152606060208201819052600090620015f29083018562001079565b828103604084015262001606818562001079565b9695505050505050565b6000602082840312156200162357600080fd5b8151801515811462000f6957600080fd5b6001600160a01b0383168152604060208201819052600090620010f59083018462001079565b600083516200166e81846020880162001053565b601d60f91b90830190815283516200168e81600184016020880162001053565b01600101949350505050565b604081526000620016af604083018562001079565b905060018060a01b03831660208301529392505050565b60008251620016da81846020870162001053565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141762000abf5762000abf620016e4565b8082018082111562000abf5762000abf620016e4565b634e487b7160e01b600052603260045260246000fd5b600081620017525762001752620016e4565b50600019019056fe60806040526040516109613803806109618339810160408190526100229161045f565b818161003082826000610039565b50505050610589565b61004283610104565b6040516001600160a01b038416907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a26000825111806100835750805b156100ff576100fd836001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ed919061051f565b836102a760201b61008b1760201c565b505b505050565b610117816102d360201b6100b71760201c565b6101765760405162461bcd60e51b815260206004820152602560248201527f455243313936373a206e657720626561636f6e206973206e6f74206120636f6e6044820152641d1c9858dd60da1b60648201526084015b60405180910390fd5b6101ea816001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101db919061051f565b6102d360201b6100b71760201c565b61024f5760405162461bcd60e51b815260206004820152603060248201527f455243313936373a20626561636f6e20696d706c656d656e746174696f6e206960448201526f1cc81b9bdd08184818dbdb9d1c9858dd60821b606482015260840161016d565b806102867fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5060001b6102e260201b6100c61760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606102cc838360405180606001604052806027815260200161093a602791396102e5565b9392505050565b6001600160a01b03163b151590565b90565b6060600080856001600160a01b031685604051610302919061053a565b600060405180830381855af49150503d806000811461033d576040519150601f19603f3d011682016040523d82523d6000602084013e610342565b606091505b5090925090506103548683838761035e565b9695505050505050565b606083156103cd5782516000036103c6576001600160a01b0385163b6103c65760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161016d565b50816103d7565b6103d783836103df565b949350505050565b8151156103ef5781518083602001fd5b8060405162461bcd60e51b815260040161016d9190610556565b80516001600160a01b038116811461042057600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561045657818101518382015260200161043e565b50506000910152565b6000806040838503121561047257600080fd5b61047b83610409565b60208401519092506001600160401b038082111561049857600080fd5b818501915085601f8301126104ac57600080fd5b8151818111156104be576104be610425565b604051601f8201601f19908116603f011681019083821181831017156104e6576104e6610425565b816040528281528860208487010111156104ff57600080fd5b61051083602083016020880161043b565b80955050505050509250929050565b60006020828403121561053157600080fd5b6102cc82610409565b6000825161054c81846020870161043b565b9190910192915050565b602081526000825180602084015261057581604085016020870161043b565b601f01601f19169190910160400192915050565b6103a2806105986000396000f3fe6080604052600436106100225760003560e01c80635c60da1b1461003957610031565b366100315761002f61006a565b005b61002f61006a565b34801561004557600080fd5b5061004e61007c565b6040516001600160a01b03909116815260200160405180910390f35b61007a6100756100c9565b61015d565b565b60006100866100c9565b905090565b60606100b0838360405180606001604052806027815260200161034660279139610181565b9392505050565b6001600160a01b03163b151590565b90565b60006100fc7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50546001600160a01b031690565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610139573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061008691906102a9565b3660008037600080366000845af43d6000803e80801561017c573d6000f35b3d6000fd5b6060600080856001600160a01b03168560405161019e91906102f6565b600060405180830381855af49150503d80600081146101d9576040519150601f19603f3d011682016040523d82523d6000602084013e6101de565b606091505b50915091506101ef868383876101f9565b9695505050505050565b6060831561026d578251600003610266576001600160a01b0385163b6102665760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b5081610277565b610277838361027f565b949350505050565b81511561028f5781518083602001fd5b8060405162461bcd60e51b815260040161025d9190610312565b6000602082840312156102bb57600080fd5b81516001600160a01b03811681146100b057600080fd5b60005b838110156102ed5781810151838201526020016102d5565b50506000910152565b600082516103088184602087016102d2565b9190910192915050565b60208152600082518060208401526103318160408501602087016102d2565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c4a329c2874d0cd83647ae1ed74363be7350808c90c0eccddadd4911808e55b764736f6c63430008110033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c65643d1f25f1ac447e55e7fec744471c4dab1c6a2b6ffb897825f9ea3d2e8c9be583a264697066735822122083072ed95f16fccd413f8cc735b19532b0120d6f06230f9546168aee2b0da9a464736f6c63430008110033";

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
