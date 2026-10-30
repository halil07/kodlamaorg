import { useMemo } from 'react'
import katex from 'katex'

interface MathTextProps {
  content: string
  className?: string
  displayBlock?: boolean
}

type Token =
  | { type: 'text'; content: string }
  | { type: 'inline-math'; math: string }
  | { type: 'block-math'; math: string }

export default function MathText({ content, className = '' }: MathTextProps) {
  const tokens = useMemo(() => {
    if (!content) return []

    // Matches $$...$$ (display math) or $...$ (inline math)
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g
    const result: Token[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
        })
      }

      const tokenStr = match[0]
      if (tokenStr.startsWith('$$') && tokenStr.endsWith('$$')) {
        result.push({
          type: 'block-math',
          math: tokenStr.slice(2, -2).trim(),
        })
      } else if (tokenStr.startsWith('$') && tokenStr.endsWith('$')) {
        result.push({
          type: 'inline-math',
          math: tokenStr.slice(1, -1).trim(),
        })
      }

      lastIndex = regex.lastIndex
    }

    if (lastIndex < content.length) {
      result.push({
        type: 'text',
        content: content.slice(lastIndex),
      })
    }

    return result
  }, [content])

  return (
    <span className={`inline-block w-full ${className}`}>
      {tokens.map((token, idx) => {
        if (token.type === 'block-math') {
          let html = ''
          try {
            html = katex.renderToString(token.math, {
              displayMode: true,
              throwOnError: false,
              strict: false,
            })
          } catch (e) {
            html = token.math
          }

          return (
            <span
              key={idx}
              className="my-3 block overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-slate-50/80 dark:bg-slate-900/60 p-4 text-center shadow-inner"
            >
              <span
                dangerouslySetInnerHTML={{ __html: html }}
                className="inline-block max-w-full text-base sm:text-lg"
              />
            </span>
          )
        }

        if (token.type === 'inline-math') {
          let html = ''
          try {
            html = katex.renderToString(token.math, {
              displayMode: false,
              throwOnError: false,
              strict: false,
            })
          } catch (e) {
            html = token.math
          }

          return (
            <span
              key={idx}
              dangerouslySetInnerHTML={{ __html: html }}
              className="inline-block px-1 align-middle text-[1.05em]"
            />
          )
        }

        // Render plain text with line breaks preserved
        return (
          <span key={idx} className="whitespace-pre-wrap">
            {token.content}
          </span>
        )
      })}
    </span>
  )
}

