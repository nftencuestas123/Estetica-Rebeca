# ✅ CHECKLIST RÁPIDO - TopView Avatar 4

## 🎯 OBJETIVO
Tener el generador de videos con IA funcionando en tu panel admin

---

## 📋 PASO A PASO (Marca con ✅ cuando completes)

### **FASE 1: Cuenta en TopView**

- [ ] Ir a https://www.topview.ai/es/make/avatar4
- [ ] Click en "Iniciar sesión"
- [ ] Crear cuenta con tu email
- [ ] Verificar email (check inbox)
- [ ] Login exitoso en TopView

⏱️ **Tiempo:** 5 minutos

---

### **FASE 2: Obtener API Key**

- [ ] Buscar sección "API" en dashboard de TopView
- [ ] O enviar email a: official@topview.ai pidiendo API access
- [ ] Recibir API Key (se ve así: `tpv_1234567890...`)
- [ ] Copiar y guardar la API Key en un lugar seguro

⏱️ **Tiempo:** 5 minutos (o 24h si esperas respuesta de email)

---

### **FASE 3: Configurar tu Proyecto**

- [ ] Abrir tu proyecto en VS Code
- [ ] Crear archivo `.env.local` en la raíz
- [ ] Pegar esto:
```bash
NEXT_PUBLIC_TOPVIEW_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_TOPVIEW_API_URL=https://api.topview.ai/v1
```
- [ ] Reemplazar `tu_api_key_aqui` con tu API Key real
- [ ] Guardar archivo (Ctrl+S)
- [ ] En terminal: Ctrl+C (detener servidor)
- [ ] En terminal: `npm run dev` (iniciar servidor)

⏱️ **Tiempo:** 3 minutos

---

### **FASE 4: Probar el Generador**

- [ ] Abrir navegador
- [ ] Ir a: `http://localhost:3000/admin`
- [ ] En sidebar, click en: **🎬 Videos IA**
- [ ] Ver que la página carga sin errores

⏱️ **Tiempo:** 1 minuto

---

### **FASE 5: Generar tu Primer Video**

- [ ] Click en área "Sube una foto"
- [ ] Seleccionar una foto clara (tuya, producto, etc.)
- [ ] Ver preview de la foto
- [ ] En "Guión del Video", escribir:
```
¡Hola! Soy [tu nombre] y te doy la bienvenida 
a nuestro centro de estética. Hoy quiero hablarte 
sobre nuestros tratamientos premium. ¡Agenda tu cita!
```
- [ ] En "Voz", dejar seleccionado: "Español - Mujer 1 (Natural)"
- [ ] Click en botón: **GENERAR VIDEO CON IA**
- [ ] Esperar 1-2 minutos
- [ ] Ver video en tab "Mis Videos"

⏱️ **Tiempo:** 5 minutos

---

### **FASE 6: Descargar y Usar**

- [ ] Click en tu video generado
- [ ] Click en botón "Descargar"
- [ ] Video guardado en tu computadora
- [ ] Probar reproducir el video (MP4)
- [ ] (Opcional) Publicar en Instagram/Facebook

⏱️ **Tiempo:** 2 minutos

---

## 🎉 TOTAL: ~21 MINUTOS

---

## ❓ SI ALGO FALLA

### **No puedo crear cuenta en TopView**
→ Verifica tu email (puede estar en spam)
→ Prueba con otro navegador

### **No recibo API Key**
→ Envía email a: official@topview.ai
→ O busca en dashboard: Configuración → API

### **Error: "API Key not configured"**
→ Verifica que `.env.local` existe
→ Verifica que no hay espacios extra
→ Reinicia servidor (Ctrl+C + npm run dev)

### **Video no se genera**
→ Verifica tu plan en TopView (¿tienes créditos?)
→ Prueba con foto más pequeña (<2MB)
→ Prueba con guión más corto (<200 palabras)

---

## 💰 PRICING SIMPLE

```
GRATIS: 2-5 videos de prueba
PRO: $49/mes → 100 videos (recomendado)
BUSINESS: $99/mes → 500 videos
```

Para empezar: **Plan Gratuito** (probar)
Luego: **Plan Pro** (uso regular)

---

## 📞 AYUDA

**Dudas sobre TopView:**
📧 official@topview.ai

**Dudas sobre el código:**
💬 Pregúntame aquí (soy tu ingeniero)

---

✅ **Cuando completes todo este checklist, estarás listo para generar videos profesionales con IA desde tu propio panel admin.**

