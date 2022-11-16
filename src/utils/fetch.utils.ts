/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const fetcher = (...args) => fetch(...args).then((res) => res.json())
