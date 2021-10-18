import kuromoji, { Tokenizer, IpadicFeatures } from 'kuromoji';

let token: Tokenizer<IpadicFeatures>;

/**
 * build token if doesn't exists
 */
async function getToken(): Promise<Tokenizer<IpadicFeatures>>{
    return new Promise((resolve, reject) => {
        if(token){
            resolve(token);
        }else{
            console.time('kuromoji');
            // todo cp node_modules/kuromoji/dict ./dict -r
            kuromoji.builder({ dicPath: './dict' }).build((err, t) => {
                err && reject(err);

                resolve(token = t);
                console.timeEnd('kuromoji');
            });
        }
    });
}

export async function get({ params }){
    const { input } = params;
    let t: Tokenizer<IpadicFeatures> = await getToken();
    return {
        status: 200,
        header: {
            'content-type': 'application/json',
        },
        body: t.tokenize(input) as IpadicFeatures[],
    };
}
