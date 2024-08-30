import {Env} from "./TestCase.ts";

export type RunSnippetDTO = {
    content: string,
    language: string,
    version?: string,
    inputs: string[],
    envs: Env[],
}

export type RunSnippetResponse = {
    output:string[],
    errors:string[]
}