import {useMutation, UseMutationResult, useQuery} from 'react-query';
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from './snippet.ts';
import {SnippetOperations} from "./snippetOperations.ts";
import {User} from "./users.ts";
import {TestCase} from "../types/TestCase.ts";
import {FileType} from "../types/FileType.ts";
import {Rule} from "../types/Rule.ts";
import {SnippetService} from "../services/snippetService.ts";
import {RunSnippetDTO} from "../types/RunSnippetDTO.ts";
import {useAuth0} from "@auth0/auth0-react";

const snippetOperations: SnippetOperations = new SnippetService()

export const useGetSnippets = (page: number = 0, pageSize: number = 10, snippetName?: string) => {
    const { isAuthenticated } = useAuth0();

    return useQuery<PaginatedSnippets, Error>(
        ['listSnippets', page, pageSize, snippetName],
        () => snippetOperations.listSnippetDescriptors(page, pageSize, snippetName),
        {
            enabled: isAuthenticated, // Solo ejecuta si el usuario está autenticado
        }
    );
};

export const useGetSnippetById = (id: string) => {
    return useQuery<Snippet | undefined, Error>(['snippet', id], () => snippetOperations.getSnippetById(id), {
        enabled: !!id, // This query will not execute until the id is provided
    });
};

export const useCreateSnippet = ({onSuccess}: {
    onSuccess: () => void
}): UseMutationResult<Snippet, Error, CreateSnippet> => {
    return useMutation<Snippet, Error, CreateSnippet>(createSnippet => snippetOperations.createSnippet(createSnippet), {onSuccess});
};

export const useUpdateSnippetById = ({onSuccess}: { onSuccess: () => void }): UseMutationResult<Snippet, Error, {
    id: string;
    updateSnippet: UpdateSnippet
}> => {
    return useMutation<Snippet, Error, { id: string; updateSnippet: UpdateSnippet }>(
        ({id, updateSnippet}) => snippetOperations.updateSnippetById(id, updateSnippet), {
            onSuccess,
        }
    );
};

export const useGetUsers = (name: string = "") => {
    return useQuery<User[], Error>(['users', name], () => snippetOperations.getUserFriends(name));
};

export const useShareSnippet = () => {
    return useMutation<Snippet, Error, { snippetId: string; userId: string }>(
        ({snippetId, userId}) => snippetOperations.shareSnippet(snippetId, userId)
    );
};


export const useGetTestCases = (snippetId: string) => {
    return useQuery<TestCase[] | undefined, Error>('testCases', () => snippetOperations.getTestCases(snippetId), {});
};


export const usePostTestCase = (snippetId: string) => {
    return useMutation<TestCase, Error, Partial<TestCase>>(
        (tc) => snippetOperations.postTestCase(snippetId, tc)
    );
};


export const useRemoveTestCase = ({onSuccess}: { onSuccess: () => void }) => {
    return useMutation<string, Error, string>(
        ['removeTestCase'],
        (id) => snippetOperations.removeTestCase(id),
        {
            onSuccess,
        }
    );
};

export type TestCaseResult = "success" | "fail"

export const useTestSnippet = () => {
    return useMutation<TestCaseResult, Error, Partial<TestCase>>(
        (tc) => snippetOperations.testSnippet(tc)
    )
}


export const useGetFormatRules = () => {
    return useQuery<Rule[], Error>('formatRules', () => snippetOperations.getFormatRules());
}

export const useModifyFormatRules = ({onSuccess}: { onSuccess: () => void }) => {
    return useMutation<Rule[], Error, Rule[]>(
        rule => snippetOperations.modifyFormatRule(rule),
        {onSuccess}
    );
}


export const useGetLintingRules = () => {
    return useQuery<Rule[], Error>('lintingRules', () => snippetOperations.getLintingRules());
}


export const useModifyLintingRules = ({onSuccess}: { onSuccess: () => void }) => {
    return useMutation<Rule[], Error, Rule[]>(
        rule => snippetOperations.modifyLintingRule(rule),
        {onSuccess}
    );
}

export const useFormatSnippet = () => {
    return useMutation<string, Error, { snippetContent: string, language: string }>(
        ({ snippetContent, language }) => snippetOperations.formatSnippet(snippetContent, language)
    );
}

export const useDeleteSnippet = ({onSuccess}: { onSuccess: () => void }) => {
    return useMutation<string, Error, string>(
        id => snippetOperations.deleteSnippet(id),
        {
            onSuccess,
        }
    );
}

export const useSetRules = () => {
    return useMutation(() =>  snippetOperations.setRules())
}
export const useGetFileTypes = () => {
    return useQuery<FileType[], Error>('fileTypes', () => snippetOperations.getFileTypes());
}

export const useExecSnippet = () => {
    return useMutation((input:RunSnippetDTO) =>  snippetOperations.execSnippet(input))
}