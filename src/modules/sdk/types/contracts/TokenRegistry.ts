/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface TokenRegistryInterface extends utils.Interface {
  functions: {
    "CREATE_PERMISSION()": FunctionFragment;
    "TERC20_NAME()": FunctionFragment;
    "TOKEN_FACTORY_DEP()": FunctionFragment;
    "TOKEN_REGISTRY_RESOURCE()": FunctionFragment;
    "addProxyPool(string,address)": FunctionFragment;
    "countPools(string)": FunctionFragment;
    "getImplementation(string)": FunctionFragment;
    "getInjector()": FunctionFragment;
    "getProxyBeacon(string)": FunctionFragment;
    "injectDependenciesToExistingPools(string,uint256,uint256)": FunctionFragment;
    "injectDependenciesToExistingPoolsWithData(string,bytes,uint256,uint256)": FunctionFragment;
    "listPools(string,uint256,uint256)": FunctionFragment;
    "setDependencies(address,bytes)": FunctionFragment;
    "setInjector(address)": FunctionFragment;
    "setNewImplementations(string[],address[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "CREATE_PERMISSION"
      | "TERC20_NAME"
      | "TOKEN_FACTORY_DEP"
      | "TOKEN_REGISTRY_RESOURCE"
      | "addProxyPool"
      | "countPools"
      | "getImplementation"
      | "getInjector"
      | "getProxyBeacon"
      | "injectDependenciesToExistingPools"
      | "injectDependenciesToExistingPoolsWithData"
      | "listPools"
      | "setDependencies"
      | "setInjector"
      | "setNewImplementations"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CREATE_PERMISSION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TERC20_NAME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TOKEN_FACTORY_DEP",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TOKEN_REGISTRY_RESOURCE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addProxyPool",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "countPools", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getImplementation",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getInjector",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProxyBeacon",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "injectDependenciesToExistingPools",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "injectDependenciesToExistingPoolsWithData",
    values: [string, BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listPools",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setDependencies",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "setInjector", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setNewImplementations",
    values: [string[], string[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "CREATE_PERMISSION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TERC20_NAME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TOKEN_FACTORY_DEP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TOKEN_REGISTRY_RESOURCE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addProxyPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "countPools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInjector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProxyBeacon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "injectDependenciesToExistingPools",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "injectDependenciesToExistingPoolsWithData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listPools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDependencies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setInjector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNewImplementations",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface TokenRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    CREATE_PERMISSION(overrides?: CallOverrides): Promise<[string]>;

    TERC20_NAME(overrides?: CallOverrides): Promise<[string]>;

    TOKEN_FACTORY_DEP(overrides?: CallOverrides): Promise<[string]>;

    TOKEN_REGISTRY_RESOURCE(overrides?: CallOverrides): Promise<[string]>;

    addProxyPool(
      name_: string,
      poolAddress_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    countPools(name_: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getImplementation(
      name_: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getInjector(
      overrides?: CallOverrides
    ): Promise<[string] & { injector_: string }>;

    getProxyBeacon(name_: string, overrides?: CallOverrides): Promise<[string]>;

    injectDependenciesToExistingPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    injectDependenciesToExistingPoolsWithData(
      name_: string,
      data_: BytesLike,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    listPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]] & { pools_: string[] }>;

    setDependencies(
      registryAddress_: string,
      data_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setInjector(
      injector_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setNewImplementations(
      names_: string[],
      newImplementations_: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  CREATE_PERMISSION(overrides?: CallOverrides): Promise<string>;

  TERC20_NAME(overrides?: CallOverrides): Promise<string>;

  TOKEN_FACTORY_DEP(overrides?: CallOverrides): Promise<string>;

  TOKEN_REGISTRY_RESOURCE(overrides?: CallOverrides): Promise<string>;

  addProxyPool(
    name_: string,
    poolAddress_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  countPools(name_: string, overrides?: CallOverrides): Promise<BigNumber>;

  getImplementation(name_: string, overrides?: CallOverrides): Promise<string>;

  getInjector(overrides?: CallOverrides): Promise<string>;

  getProxyBeacon(name_: string, overrides?: CallOverrides): Promise<string>;

  injectDependenciesToExistingPools(
    name_: string,
    offset_: BigNumberish,
    limit_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  injectDependenciesToExistingPoolsWithData(
    name_: string,
    data_: BytesLike,
    offset_: BigNumberish,
    limit_: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  listPools(
    name_: string,
    offset_: BigNumberish,
    limit_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  setDependencies(
    registryAddress_: string,
    data_: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setInjector(
    injector_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setNewImplementations(
    names_: string[],
    newImplementations_: string[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    CREATE_PERMISSION(overrides?: CallOverrides): Promise<string>;

    TERC20_NAME(overrides?: CallOverrides): Promise<string>;

    TOKEN_FACTORY_DEP(overrides?: CallOverrides): Promise<string>;

    TOKEN_REGISTRY_RESOURCE(overrides?: CallOverrides): Promise<string>;

    addProxyPool(
      name_: string,
      poolAddress_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    countPools(name_: string, overrides?: CallOverrides): Promise<BigNumber>;

    getImplementation(
      name_: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getInjector(overrides?: CallOverrides): Promise<string>;

    getProxyBeacon(name_: string, overrides?: CallOverrides): Promise<string>;

    injectDependenciesToExistingPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    injectDependenciesToExistingPoolsWithData(
      name_: string,
      data_: BytesLike,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    listPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    setDependencies(
      registryAddress_: string,
      data_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setInjector(injector_: string, overrides?: CallOverrides): Promise<void>;

    setNewImplementations(
      names_: string[],
      newImplementations_: string[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    CREATE_PERMISSION(overrides?: CallOverrides): Promise<BigNumber>;

    TERC20_NAME(overrides?: CallOverrides): Promise<BigNumber>;

    TOKEN_FACTORY_DEP(overrides?: CallOverrides): Promise<BigNumber>;

    TOKEN_REGISTRY_RESOURCE(overrides?: CallOverrides): Promise<BigNumber>;

    addProxyPool(
      name_: string,
      poolAddress_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    countPools(name_: string, overrides?: CallOverrides): Promise<BigNumber>;

    getImplementation(
      name_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInjector(overrides?: CallOverrides): Promise<BigNumber>;

    getProxyBeacon(
      name_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    injectDependenciesToExistingPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    injectDependenciesToExistingPoolsWithData(
      name_: string,
      data_: BytesLike,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    listPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setDependencies(
      registryAddress_: string,
      data_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setInjector(
      injector_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setNewImplementations(
      names_: string[],
      newImplementations_: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CREATE_PERMISSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TERC20_NAME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TOKEN_FACTORY_DEP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TOKEN_REGISTRY_RESOURCE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addProxyPool(
      name_: string,
      poolAddress_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    countPools(
      name_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getImplementation(
      name_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInjector(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProxyBeacon(
      name_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    injectDependenciesToExistingPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    injectDependenciesToExistingPoolsWithData(
      name_: string,
      data_: BytesLike,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    listPools(
      name_: string,
      offset_: BigNumberish,
      limit_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setDependencies(
      registryAddress_: string,
      data_: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setInjector(
      injector_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setNewImplementations(
      names_: string[],
      newImplementations_: string[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
