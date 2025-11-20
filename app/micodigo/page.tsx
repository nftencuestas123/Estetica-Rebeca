
'use client'

import { useState, useRef, useEffect } from 'react'
import { getFileDescription } from '@/lib/file-dictionary'
import { Folder, FileCode, FileJson, FileText, Settings, ChevronRight, MessageSquare, Send, X, Loader2, Terminal } from 'lucide-react'

interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export default function CodeExplorerPage() {
    const [fileStructure, setFileStructure] = useState<any[]>([])
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [fileInfo, setFileInfo] = useState<any>(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: 'Hola! Soy tu Asistente de Código IA. Pregúntame cualquier duda sobre tu proyecto.' }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isStructureLoading, setIsStructureLoading] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetch('/api/code-explorer')
            .then(res => res.json())
            .then(data => {
                setFileStructure(data)
                setIsStructureLoading(false)
            })
            .catch(err => {
                console.error('Error loading file structure:', err)
                setIsStructureLoading(false)
            })
    }, [])

    const handleFileClick = (filename: string) => {
        setSelectedFile(filename)
        setFileInfo(getFileDescription(filename))
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputMessage.trim()) return

        const newMessage: ChatMessage = { role: 'user', content: inputMessage }
        setChatMessages(prev => [...prev, newMessage])
        setInputMessage('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/code-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputMessage,
                    history: chatMessages.map(m => ({ role: m.role, content: m.content }))
                })
            })

            const data = await response.json()
            setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }])
        } catch (error) {
            setChatMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error al conectar con el servidor.' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col md:flex-row overflow-hidden">

            {/* SIDEBAR - Explorador */}
            <div className="w-full md:w-80 bg-[#1e293b] border-r border-slate-700 flex flex-col h-[50vh] md:h-screen">
                <div className="p-4 border-b border-slate-700 bg-[#0f172a]">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Terminal className="text-blue-400" />
                        Explorador de Código
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Estética Rebeca v1.0</p>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Archivos del Proyecto</div>
                    {fileStructure.map((item) => (
                        <FileTreeItem key={item.name} item={item} onSelect={handleFileClick} selected={selectedFile} />
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT - Detalles */}
            <div className="flex-1 flex flex-col h-[50vh] md:h-screen overflow-hidden relative">
                {selectedFile && fileInfo ? (
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-4xl">{fileInfo.icon}</div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white">{fileInfo.title}</h2>
                                    <code className="text-sm bg-slate-800 px-2 py-1 rounded text-blue-300 mt-1 inline-block">{selectedFile}</code>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
                                    <h3 className="text-lg font-semibold text-blue-400 mb-2">¿Qué es esto?</h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">{fileInfo.description}</p>
                                </div>

                                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
                                    <h3 className="text-lg font-semibold text-purple-400 mb-2">¿Por qué es importante?</h3>
                                    <p className="text-slate-300 leading-relaxed">{fileInfo.importance}</p>
                                </div>

                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => {
                                            setIsChatOpen(true)
                                            setInputMessage(`¿Puedes explicarme más detalles sobre el archivo ${selectedFile}?`)
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                                    >
                                        <MessageSquare size={18} />
                                        Preguntar a la IA sobre este archivo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                        <Folder size={64} className="mb-4 opacity-20" />
                        <h2 className="text-2xl font-semibold text-slate-400 mb-2">Selecciona un archivo</h2>
                        <p>Haz clic en cualquier archivo del menú izquierdo para ver su explicación detallada pixel por pixel.</p>
                    </div>
                )}
            </div>

            {/* CHAT BOT - Flotante */}
            <div className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 bg-[#1e293b] border border-slate-700 shadow-2xl rounded-t-xl md:rounded-xl flex flex-col transition-all duration-300 z-50 ${isChatOpen ? 'h-[500px] translate-y-0' : 'h-14 translate-y-0 overflow-hidden'}`}>

                {/* Header Chat */}
                <div
                    className="p-4 bg-blue-600 text-white flex items-center justify-between cursor-pointer rounded-t-xl"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                >
                    <div className="flex items-center gap-2 font-semibold">
                        <MessageSquare size={18} />
                        Asistente de Código IA
                    </div>
                    {isChatOpen ? <X size={18} /> : <ChevronRight className="-rotate-90" size={18} />}
                </div>

                {/* Chat Body */}
                {isChatOpen && (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a]">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-[#1e293b] text-slate-200 border border-slate-700 rounded-bl-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#1e293b] p-3 rounded-lg border border-slate-700 flex items-center gap-2 text-slate-400 text-sm">
                                        <Loader2 className="animate-spin" size={14} />
                                        Pensando...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-[#1e293b] border-t border-slate-700 flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Escribe tu duda..."
                                className="flex-1 bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputMessage.trim()}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </>
                )}
            </div>

        </div>
    )
}

// Componente recursivo para el árbol de archivos
function FileTreeItem({ item, onSelect, selected }: { item: any, onSelect: (name: string) => void, selected: string | null }) {
    const [isOpen, setIsOpen] = useState(false)
    const isFolder = item.type === 'folder'
    const isSelected = selected === item.name

    const getIcon = () => {
        if (isFolder) return <Folder size={16} className="text-yellow-500" />
        if (item.name.endsWith('.ts') || item.name.endsWith('.tsx')) return <FileCode size={16} className="text-blue-400" />
        if (item.name.endsWith('.json')) return <FileJson size={16} className="text-green-400" />
        if (item.name.endsWith('.md')) return <FileText size={16} className="text-slate-400" />
        return <FileText size={16} className="text-slate-400" />
    }

    return (
        <div className="ml-2">
            <div
                className={`flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer transition-colors ${isSelected ? 'bg-blue-600/20 text-blue-300' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                onClick={() => {
                    if (isFolder) setIsOpen(!isOpen)
                    else onSelect(item.name)
                }}
            >
                {isFolder && (
                    <ChevronRight size={14} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                )}
                {getIcon()}
                <span className="text-sm truncate">{item.name}</span>
            </div>

            {isFolder && isOpen && item.children && (
                <div className="border-l border-slate-700 ml-2 pl-1">
                    {item.children.map((child: any) => (
                        <FileTreeItem key={child.name} item={child} onSelect={onSelect} selected={selected} />
                    ))}
                </div>
            )}
        </div>
    )
}
