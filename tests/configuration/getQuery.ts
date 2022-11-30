import fs from 'fs';

export async function getQuery(): Promise<string>  {
    const query: string = await fs.promises.readFile(__dirname + '/sql/insertRegisters.sql', 'utf-8');
    return query;
}