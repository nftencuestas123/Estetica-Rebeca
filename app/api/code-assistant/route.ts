
import { NextResponse } from 'next/server'
import { chatWithCodeAssistant } from '@/lib/code-assistant-service'

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json()

        if (!message) {
            return NextResponse.json(
                { error: 'El mensaje es requerido' },
                { status: 400 }
            )
        }

        const response = await chatWithCodeAssistant(message, history)

        return NextResponse.json({ response })
    } catch (error) {
        console.error('Error en API Code Assistant:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
