# Guía de contribución — Flujo Git Flow

Este proyecto usa **Git Flow** como modelo de ramas.

## Ramas principales

| Rama | Propósito | Protegida |
|---|---|---|
| `main` | Código en producción, siempre estable | ✅ |
| `develop` | Integración de features antes de release | ✅ |

## Ramas de soporte

| Tipo | Nace de | Se mergea a | Ejemplo |
|---|---|---|---|
| `feature/*` | `develop` | `develop` | `feature/capitalize-function` |
| `hotfix/*` | `main` | `main` **y** `develop` | `hotfix/fix-palindrome-crash` |
| `release/*` | `develop` | `main` **y** `develop` | `release/v1.1.0` |

## Flujo para una feature nueva

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-la-feature

# ... trabajo y commits ...

git push -u origin feature/nombre-de-la-feature
# Abrir MR: feature/nombre-de-la-feature → develop
```

## Flujo para un hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/descripcion-del-bug

# ... fix y commit ...

git push -u origin hotfix/descripcion-del-bug
# Abrir MR: hotfix/descripcion-del-bug → main
# Después: mergear también hotfix → develop para no perder el fix
```

## Convención de commits

Se usa el estilo **Conventional Commits**:

```
feat: agrega función de validación de palíndromos
fix: corrige crash cuando el input está vacío
docs: actualiza README con instrucciones de instalación
refactor: simplifica lógica de capitalize
chore: actualiza dependencias
```

## Backlog de features futuras (para ir generando commits de desarrollo)

- [ ] `feature/discount-calculator` — función que calcule descuentos sobre un precio
- [ ] `feature/string-reverse` — función que invierta un string
- [ ] `feature/array-average` — función que calcule el promedio de un array de números
- [ ] `feature/email-validator` — validación simple de formato de email con regex
- [ ] `feature/cli-interface` — interfaz de línea de comandos simple para probar las funciones
- [ ] `chore/add-unit-tests` — agregar Jest y tests unitarios reales
- [ ] `docs/api-reference` — documentar cada función exportada

> Cada item de este backlog es una rama `feature/*` independiente → un MR independiente → commits pequeños. Esto da una progresión de desarrollo creíble a lo largo del cuatrimestre.
