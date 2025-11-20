
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface FileNode {
    name: string
    type: 'file' | 'folder'
    children?: FileNode[]
}

const IGNORED_FILES = ['.git', '.next', 'node_modules', '.DS_Store']

function getDirectoryStructure(dirPath: string): FileNode[] {
    try {
        const items = fs.readdirSync(dirPath)

        const structure: FileNode[] = items
            .filter(item => !IGNORED_FILES.includes(item))
            .map(item => {
                const fullPath = path.join(dirPath, item)
                const stats = fs.statSync(fullPath)
                const isDirectory = stats.isDirectory()

                if (isDirectory) {
                    return {
                        name: item,
                        type: 'folder' as const,
                        children: getDirectoryStructure(fullPath)
                    }
                } else {
                    return {
                        name: item,
                        type: 'file' as const
                    }
                }
            })
            // Ordenar: carpetas primero, luego archivos
            .sort((a, b) => {
                if (a.type === b.type) return a.name.localeCompare(b.name)
                return a.type === 'folder' ? -1 : 1
            })

        return structure
    } catch (error) {
        console.error('Error reading directory:', error)
        return []
    }
}

export async function GET() {
    const rootDir = process.cwd()
    const structure = getDirectoryStructure(rootDir)
    return NextResponse.json(structure)
}
