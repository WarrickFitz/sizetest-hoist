import { Api, ApiInterfaces, JsonRpc, RpcInterfaces } from 'eosjs';

export class Greeter {
  private greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  public greet(): string {
    return `Bonjour from p1, ${this.greeting}!`;
  }

  public test() {
    alert('test');

    // const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // useraaaaaaaa
    // const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    const rpcInstance = new JsonRpc('http://127.0.0.1:8888');

    const signatureProviderInstance = {
      async getAvailableKeys(): Promise<string[]> {
        return [];
      },
      async sign(
        signatureProviderArgs: ApiInterfaces.SignatureProviderArgs
      ): Promise<RpcInterfaces.PushTransactionArgs> {
        const r = {
          serializedTransaction: new Uint8Array(2),
          signatures: [],
        };
        return r;
      },
    };

    const args = {
      abiProvider: undefined,
      authorityProvider: undefined,
      chainId: undefined,
      rpc: rpcInstance,
      signatureProvider: signatureProviderInstance,
      textDecoder: undefined,
      textEncoder: undefined,
    };

    const api = new Api(args);
    (async () => {
      const result = await api.transact(
        {
          actions: [
            {
              account: 'eosio.token',
              authorization: [
                {
                  actor: 'useraaaaaaaa',
                  permission: 'active',
                },
              ],
              data: {
                from: 'useraaaaaaaa',
                memo: '',
                quantity: '0.0001 SYS',
                to: 'useraaaaaaab',
              },
              name: 'transfer',
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
      // console.dir(result);
      alert(result);
    })();
  }
}
