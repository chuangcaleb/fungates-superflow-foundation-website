/**
 * Lexical RichText content structure from Payload
 */
type LexicalNode = {
  type: string
  version: number
  children?: LexicalNode[]
  [key: string]: unknown
}

type LexicalRoot = {
  type: string
  children: LexicalNode[]
  direction: 'ltr' | 'rtl' | null
  format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
  indent: number
  version: number
}

export type RichTextContent =
  | {
      root: LexicalRoot
      [key: string]: unknown
    }
  | null
  | undefined

/**
 * Check if Lexical RichText content is empty (default empty paragraph state)
 * Detects when a RichText field has only the default single empty paragraph node
 */
export const isEmptyRichText = (richText: RichTextContent): boolean => {
  if (!richText?.root?.children) return true

  const { children } = richText.root

  return (
    Array.isArray(children) &&
    children.length === 1 &&
    'children' in children[0] &&
    Array.isArray(children[0].children) &&
    children[0].children.length === 0
  )
}
