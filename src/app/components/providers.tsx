'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

const client = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
    // QCP eg ek component sa kuch responce recive krta request sent krny k baad usko cash kr lata h dosri dfa jb hmy responce chahya hota ha wo hi responce to cash ma sa la lata ha dubara request nhi sent krta
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Providers