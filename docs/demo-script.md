# Guion de simulación: PR → Code Review → Fix Comments → Revert

Este documento es el paso a paso **copiable** para grabar la demo en GitHub y luego repetirla en vivo en GitLab. Usa el proyecto `gitflow-demo-toolkit` incluido en este repo.

---

## 0. Setup inicial (una sola vez)

```bash
git checkout -b develop main
git push -u origin develop
```

Configurar en GitHub/GitLab: **Settings → Branches → Protección** sobre `main` y `develop` (require PR before merge). Esto es lo que hace que el flujo se vea "real" en la demo.

---

## 1. Feature con bug intencional: `isPalindrome`

### Crear la rama
```bash
git checkout develop
git checkout -b feature/palindrome-checker
```

### Versión CON bug (a propósito, para la demo)
Reemplazar el contenido de `src/utils/isPalindrome.ts` por esta versión, que no maneja mayúsculas ni espacios:

```typescript
export function isPalindrome(text: string): boolean {
  const reversed = text.split('').reverse().join('');
  return text === reversed;
}
```

### Commit y push
```bash
git add src/utils/isPalindrome.ts
git commit -m "feat: agrega función isPalindrome"
git push -u origin feature/palindrome-checker
```

### Abrir el MR/PR
**Rama origen:** `feature/palindrome-checker` → **Rama destino:** `develop`

**Título del PR:**
```
feat: agrega función para verificar palíndromos
```

**Descripción del PR (usar el template):**
```markdown
## 📌 Descripción
Agrega la función `isPalindrome`, que verifica si un string es un palíndromo.

## 🔗 Issue relacionado
Closes #4

## 🧪 ¿Cómo se probó?
npm install
npm run lint
npm start

## 🧭 Tipo de cambio
- [x] Feature
```

---

## 2. Simular el Code Review

Con una segunda cuenta (o navegador en incógnito con otra sesión), comentar **sobre la línea** de `isPalindrome.ts`:

> 💬 **Comentario del reviewer:**
> "Esta función falla con `'Anita lava la tina'` porque no ignora mayúsculas ni espacios. ¿Podés normalizar el input antes de comparar? Request changes."

Marcar el PR como **Request changes**.

---

## 3. Fix comments

Corregir el código:

```typescript
export function isPalindrome(text: string): boolean {
  const normalized = text.toLowerCase().replace(/\s/g, '');
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}
```

```bash
git add src/utils/isPalindrome.ts
git commit -m "fix: normaliza mayúsculas y espacios antes de comparar en isPalindrome"
git push
```

En la plataforma: marcar el comentario como **Resolved** y pedir **re-review**. El reviewer aprueba (**Approve**).

### Mergear
Mergear `feature/palindrome-checker` → `develop` (botón de la plataforma, no local).

---

## 4. Simular la falla en producción → Revert

Escenario: se hizo un `release/v1.0.0` desde `develop` hacia `main`, y **ya en producción** aparece un reporte: la función rompe con strings vacíos.

### Opción A — Revert desde la plataforma (recomendado para la demo)
1. Ir al MR ya mergeado de `isPalindrome`.
2. Click en **Revert**.
3. Esto crea automáticamente una nueva rama y un nuevo MR con el revert.
4. Completar la descripción:
   ```markdown
   ## 📌 Descripción
   Revert de #7 — se detectó que `isPalindrome` genera un comportamiento
   inesperado en producción con inputs vacíos. Se revierte mientras se
   investiga la causa raíz.

   ## 🧭 Tipo de cambio
   - [x] Fix (revert de emergencia)
   ```
5. Mergear ese revert-MR (puede saltarse review completo si es urgente, pero queda documentado igual).

### Opción B — Revert manual por consola (para mostrar el comando también)
```bash
git checkout main
git log --oneline   # buscar el hash del merge commit
git revert -m 1 <hash-del-merge-commit>
git push origin main
```

### Cierre del incidente
Crear rama `hotfix/palindrome-empty-string` desde `main`, corregir de verdad, y repetir el flujo de MR normal hacia `main` + `develop`.

---

## 5. Resumen de commits generados en esta simulación

```
feat: agrega función isPalindrome
fix: normaliza mayúsculas y espacios antes de comparar en isPalindrome
Merge branch 'feature/palindrome-checker' into 'develop'
Revert "Merge branch 'feature/palindrome-checker' into 'develop'"
fix: corrige manejo de string vacío en isPalindrome (hotfix)
```

Esta secuencia es la que conviene mostrar con `git log --oneline --graph --all` al final de la demo — visualmente muestra todo el flujo de una sola vez.
