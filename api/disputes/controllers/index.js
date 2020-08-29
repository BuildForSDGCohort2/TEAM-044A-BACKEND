import makePostDispute from './postDispute'
import makePatchDispute from './patchDispute'
import makeGetDisputes from './getDisputes'
import { addDispute, listDisputes, editDispute } from '../use-cases'

const postDispute = makePostDispute({ addDispute })
const patchDispute = makePatchDispute({ editDispute })
const getDisputes = makeGetDisputes({ listDisputes })

export { postDispute, patchDispute, getDisputes }
