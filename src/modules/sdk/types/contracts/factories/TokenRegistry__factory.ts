/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TokenRegistry, TokenRegistryInterface } from "../TokenRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    name: "TERC20_NAME",
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
    name: "TOKEN_FACTORY_DEP",
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
    name: "TOKEN_REGISTRY_RESOURCE",
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
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "address",
        name: "poolAddress_",
        type: "address",
      },
    ],
    name: "addProxyPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
    ],
    name: "countPools",
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
        internalType: "string",
        name: "name_",
        type: "string",
      },
    ],
    name: "getImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
        internalType: "string",
        name: "name_",
        type: "string",
      },
    ],
    name: "getProxyBeacon",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
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
    name: "injectDependenciesToExistingPools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
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
    name: "injectDependenciesToExistingPoolsWithData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
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
    name: "listPools",
    outputs: [
      {
        internalType: "address[]",
        name: "pools_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "string[]",
        name: "names_",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "newImplementations_",
        type: "address[]",
      },
    ],
    name: "setNewImplementations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506118ab806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806352837c411161009757806371dd21c61161006657806371dd21c6146102555780638cb941cc14610275578063b3e657fb14610288578063c21182e7146102ad57600080fd5b806352837c41146101e657806362737f87146101f9578063691304511461022f5780636b6838961461024257600080fd5b806324d6780f116100d357806324d6780f1461015d57806331dd5cf01461017057806333c219171461019c5780633e3b5b19146101bd57600080fd5b806305c05408146100fa57806309ae152b1461010f5780630dafce0014610122575b600080fd5b61010d610108366004611039565b6102c0565b005b61010d61011d3660046110fa565b610333565b6101476040518060400160405280600681526020016505445524332360d41b81525081565b60405161015491906111a0565b60405180910390f35b61010d61016b3660046111b3565b6103e7565b6101476040518060400160405280600d81526020016c544f4b454e5f464143544f525960981b81525081565b6101af6101aa3660046112b8565b610451565b604051908152602001610154565b600080516020611856833981519152545b6040516001600160a01b039091168152602001610154565b61010d6101f43660046112f4565b61047f565b61014760405180604001604052806017815260200176544f4b454e5f52454749535452595f5245534f5552434560481b81525081565b61010d61023d366004611371565b610525565b6101ce6102503660046112b8565b61065f565b6102686102633660046113c5565b61077e565b6040516101549190611412565b61010d61028336600461145f565b6107b5565b6101476040518060400160405280600681526020016543524541544560d01b81525081565b6101ce6102bb3660046112b8565b6107d6565b6102e76040518060400160405280600681526020016543524541544560d01b815250610860565b61032d6102f4848661147c565b83838080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525061094c92505050565b50505050565b6004546001600160a01b031633146103a15760405162461bcd60e51b815260206004820152602660248201527f546f6b656e52656769737472793a2063616c6c6572206973206e6f74206120666044820152656163746f727960d01b60648201526084015b60405180910390fd5b6103e283838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250859250610bd0915050565b505050565b61040e6040518060400160405280600681526020016543524541544560d01b815250610860565b61032d84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250869250859150610bf99050565b600061047960028360405161046691906114ff565b9081526020016040518091039020610c14565b92915050565b6104a66040518060400160405280600681526020016543524541544560d01b815250610860565b61051d86868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050604080516020601f8a018190048102820181019092528881529250889150879081908401838280828437600092019190915250879250869150610c1e9050565b505050505050565b610530838383610d6d565b6000839050806001600160a01b031663085ec2976040518163ffffffff1660e01b8152600401602060405180830381865afa158015610573573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610597919061151b565b600380546001600160a01b0319166001600160a01b03928316179055604080518082018252600d81526c544f4b454e5f464143544f525960981b60208201529051633581777360e01b8152918316916335817773916105f8916004016111a0565b602060405180830381865afa158015610615573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610639919061151b565b600480546001600160a01b0319166001600160a01b039290921691909117905550505050565b6000806001600160a01b031660018360405161067b91906114ff565b908152604051908190036020019020546001600160a01b0316036106fb5760405162461bcd60e51b815260206004820152603160248201527f506f6f6c436f6e74726163747352656769737472793a2074686973206d6170706044820152701a5b99c8191bd95cdb89dd08195e1a5cdd607a1b6064820152608401610398565b60018260405161070b91906114ff565b908152604080516020928190038301812054635c60da1b60e01b825291516001600160a01b0390921692635c60da1b926004808401938290030181865afa15801561075a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610479919061151b565b60606107ab838360028760405161079591906114ff565b9081526040519081900360200190209190610dad565b90505b9392505050565b6107bd610e75565b6107d38160008051602061185683398151915255565b50565b6000806001836040516107e991906114ff565b908152604051908190036020019020546001600160a01b03169050806104795760405162461bcd60e51b815260206004820152602660248201527f506f6f6c436f6e74726163747352656769737472793a206261642050726f78796044820152652132b0b1b7b760d11b6064820152608401610398565b6003546040805180820182526017815276544f4b454e5f52454749535452595f5245534f5552434560481b60208201529051633ca8e36d60e11b81526001600160a01b0390921691637951c6da916108bf913391908690600401611538565b602060405180830381865afa1580156108dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109009190611578565b6107d35760405162461bcd60e51b815260206004820152601c60248201527f546f6b656e52656769737472793a206163636573732064656e696564000000006044820152606401610398565b60005b82518110156103e25760006001600160a01b031660018483815181106109775761097761159a565b602002602001015160405161098c91906114ff565b908152604051908190036020019020546001600160a01b031603610a2c576040516109b690610fe1565b604051809103906000f0801580156109d2573d6000803e3d6000fd5b5060018483815181106109e7576109e761159a565b60200260200101516040516109fc91906114ff565b90815260405190819003602001902080546001600160a01b03929092166001600160a01b03199092169190911790555b818181518110610a3e57610a3e61159a565b60200260200101516001600160a01b03166001848381518110610a6357610a6361159a565b6020026020010151604051610a7891906114ff565b908152604080516020928190038301812054635c60da1b60e01b825291516001600160a01b0390921692635c60da1b926004808401938290030181865afa158015610ac7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aeb919061151b565b6001600160a01b031614610bbe576001838281518110610b0d57610b0d61159a565b6020026020010151604051610b2291906114ff565b9081526040519081900360200190205482516001600160a01b0390911690630900f01090849084908110610b5857610b5861159a565b60200260200101516040518263ffffffff1660e01b8152600401610b8b91906001600160a01b0391909116815260200190565b600060405180830381600087803b158015610ba557600080fd5b505af1158015610bb9573d6000803e3d6000fd5b505050505b80610bc8816115c6565b91505061094f565b6103e281600284604051610be491906114ff565b90815260405190819003602001902090610ef9565b6103e283604051806020016040528060008152508484610c1e565b6000610479825490565b6000600285604051610c3091906114ff565b908152602001604051809103902090506000610c6884610c62610c5285610c14565b610c5c87896115df565b90610f0e565b90610f24565b9050838103610ccb5760405162461bcd60e51b815260206004820152602960248201527f506f6f6c436f6e74726163747352656769737472793a206e6f20706f6f6c73206044820152681d1bc81a5b9a9958dd60ba1b6064820152608401610398565b6000546201000090046001600160a01b0316845b82811015610d6357610cf18482610f33565b6001600160a01b0316636913045183896040518363ffffffff1660e01b8152600401610d1e9291906115f2565b600060405180830381600087803b158015610d3857600080fd5b505af1158015610d4c573d6000803e3d6000fd5b505050508080610d5b906115c6565b915050610cdf565b5050505050505050565b610d75610e75565b6000805462010000600160b01b031916620100006001600160a01b038616021790553360008051602061185683398151915255505050565b60606000610dc4610dbd86610c14565b8585610f3f565b9050610dd08482611616565b6001600160401b03811115610de757610de7611203565b604051908082528060200260200182016040528015610e10578160200160208202803683370190505b509150835b81811015610e6c57610e278682610f33565b83610e328784611616565b81518110610e4257610e4261159a565b6001600160a01b039092166020928302919091019091015280610e64816115c6565b915050610e15565b50509392505050565b6000610e8d6000805160206118568339815191525490565b90506001600160a01b0381161580610ead57506001600160a01b03811633145b6107d35760405162461bcd60e51b815260206004820152601a60248201527f446570656e64616e743a206e6f7420616e20696e6a6563746f720000000000006044820152606401610398565b60006107ae836001600160a01b038416610f68565b6000818310610f1d57816107ae565b5090919050565b6000818311610f1d57816107ae565b60006107ae8383610fb7565b6000610f4b82846115df565b905083811115610f585750825b808311156107ae57509092915050565b6000818152600183016020526040812054610faf57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610479565b506000610479565b6000826000018281548110610fce57610fce61159a565b9060005260206000200154905092915050565b61022c8061162a83390190565b60008083601f84011261100057600080fd5b5081356001600160401b0381111561101757600080fd5b6020830191508360208260051b850101111561103257600080fd5b9250929050565b6000806000806040858703121561104f57600080fd5b84356001600160401b038082111561106657600080fd5b61107288838901610fee565b9096509450602087013591508082111561108b57600080fd5b5061109887828801610fee565b95989497509550505050565b60008083601f8401126110b657600080fd5b5081356001600160401b038111156110cd57600080fd5b60208301915083602082850101111561103257600080fd5b6001600160a01b03811681146107d357600080fd5b60008060006040848603121561110f57600080fd5b83356001600160401b0381111561112557600080fd5b611131868287016110a4565b9094509250506020840135611145816110e5565b809150509250925092565b60005b8381101561116b578181015183820152602001611153565b50506000910152565b6000815180845261118c816020860160208601611150565b601f01601f19169290920160200192915050565b6020815260006107ae6020830184611174565b600080600080606085870312156111c957600080fd5b84356001600160401b038111156111df57600080fd5b6111eb878288016110a4565b90989097506020870135966040013595509350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561124157611241611203565b604052919050565b600082601f83011261125a57600080fd5b81356001600160401b0381111561127357611273611203565b611286601f8201601f1916602001611219565b81815284602083860101111561129b57600080fd5b816020850160208301376000918101602001919091529392505050565b6000602082840312156112ca57600080fd5b81356001600160401b038111156112e057600080fd5b6112ec84828501611249565b949350505050565b6000806000806000806080878903121561130d57600080fd5b86356001600160401b038082111561132457600080fd5b6113308a838b016110a4565b9098509650602089013591508082111561134957600080fd5b5061135689828a016110a4565b979a9699509760408101359660609091013595509350505050565b60008060006040848603121561138657600080fd5b8335611391816110e5565b925060208401356001600160401b038111156113ac57600080fd5b6113b8868287016110a4565b9497909650939450505050565b6000806000606084860312156113da57600080fd5b83356001600160401b038111156113f057600080fd5b6113fc86828701611249565b9660208601359650604090950135949350505050565b6020808252825182820181905260009190848201906040850190845b818110156114535783516001600160a01b03168352928401929184019160010161142e565b50909695505050505050565b60006020828403121561147157600080fd5b81356107ae816110e5565b60006001600160401b038084111561149657611496611203565b8360051b60206114a7818301611219565b8681529185019181810190368411156114bf57600080fd5b865b848110156114f3578035868111156114d95760008081fd5b6114e536828b01611249565b8452509183019183016114c1565b50979650505050505050565b60008251611511818460208701611150565b9190910192915050565b60006020828403121561152d57600080fd5b81516107ae816110e5565b6001600160a01b038416815260606020820181905260009061155c90830185611174565b828103604084015261156e8185611174565b9695505050505050565b60006020828403121561158a57600080fd5b815180151581146107ae57600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016115d8576115d86115b0565b5060010190565b80820180821115610479576104796115b0565b6001600160a01b03831681526040602082018190526000906107ab90830184611174565b81810381811115610479576104796115b056fe60a060405234801561001057600080fd5b50336080526080516101fd61002f6000396000607101526101fd6000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630900f0101461003b5780635c60da1b14610050575b600080fd5b61004e610049366004610197565b61006f565b005b600054604080516001600160a01b039092168252519081900360200190f35b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633146100ec5760405162461bcd60e51b815260206004820152601960248201527f50726f7879426561636f6e3a206e6f7420616e206f776e65720000000000000060448201526064015b60405180910390fd5b6001600160a01b0381163b6101435760405162461bcd60e51b815260206004820152601b60248201527f50726f7879426561636f6e3a206e6f74206120636f6e7472616374000000000060448201526064016100e3565b600080546001600160a01b0319166001600160a01b0383169081179091556040519081527fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b9060200160405180910390a150565b6000602082840312156101a957600080fd5b81356001600160a01b03811681146101c057600080fd5b939250505056fea2646970667358221220d8fb109918d59844f78aca6edebabf56615c575e501f325a4f4ae10ad473910b64736f6c634300081100333d1f25f1ac447e55e7fec744471c4dab1c6a2b6ffb897825f9ea3d2e8c9be583a2646970667358221220dc1d5f59646477a3acfc364fc2008c874863392dff3db7affb1f1131fd28a26a64736f6c63430008110033";

type TokenRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenRegistry__factory extends ContractFactory {
  constructor(...args: TokenRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<TokenRegistry> {
    return super.deploy(overrides || {}) as Promise<TokenRegistry>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TokenRegistry {
    return super.attach(address) as TokenRegistry;
  }
  override connect(signer: Signer): TokenRegistry__factory {
    return super.connect(signer) as TokenRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenRegistryInterface {
    return new utils.Interface(_abi) as TokenRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenRegistry {
    return new Contract(address, _abi, signerOrProvider) as TokenRegistry;
  }
}
