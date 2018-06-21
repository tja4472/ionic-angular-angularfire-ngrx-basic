- @ionic/angular 4.0.0-alpha.7
- @angular 6.0.4
- angularfire2 5.0.0-rc.10
- @ngrx 6.0.1

https://github.com/ionic-team/starters/tree/master/angular/base
https://github.com/ionic-team/starters/tree/master/angular/official

Based on blank template.

npm start

https://angular.io/guide/reactive-forms

https://github.com/angular/angularfire2

https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md
https://github.com/ionic-team/ionic/tree/master/core/src/components

https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md

https://angular.io/guide/updating

```powershell
# npm run ng update
npx ng update
```

```powershell
npm run ng update -- rxjs
```

```powershell
npm run ng update -- --all
```

```powershell
npm ls --depth=0
```

```powershell
npm run ng -- generate @ngrx/schematics:store State --root --module app.module.ts
```

## Initial Effects Setup

```bash
npx ng generate @ngrx/schematics:effect App --root --module app.module.ts
# CREATE src/app/app.effects.ts (182 bytes)
# CREATE src/app/app.effects.spec.ts (571 bytes)
# UPDATE src/app/app.module.ts (1776 bytes)
```

## Auth feature

```bash
npx ng generate module Auth
# CREATE src/app/auth/auth.module.spec.ts (259 bytes)
# CREATE src/app/auth/auth.module.ts (188 bytes)
npx ng generate feature auth/Auth --module auth --group
# CREATE src/app/auth/actions/auth.actions.ts (229 bytes)
# CREATE src/app/auth/reducers/auth.reducer.ts (381 bytes)
# CREATE src/app/auth/reducers/auth.reducer.spec.ts (322 bytes)
# CREATE src/app/auth/effects/auth.effects.ts (328 bytes)
# CREATE src/app/auth/effects/auth.effects.spec.ts (577 bytes)
# UPDATE src/app/auth/auth.module.ts (484 bytes)
```

## Tasks

```bash
npx ng generate entity Task --flat false --reducers reducers/index.ts
# CREATE src/app/task/task.actions.ts (2078 bytes)
# CREATE src/app/task/task.model.ts (40 bytes)
# CREATE src/app/task/task.reducer.ts (1746 bytes)
# CREATE src/app/task/task.reducer.spec.ts (322 bytes)
# UPDATE src/app/reducers/index.ts (565 bytes)
```

```bash
npx ng generate effect task/Task --root -m app.module.ts
# CREATE src/app/task/task.effects.ts (183 bytes)
# CREATE src/app/task/task.effects.spec.ts (577 bytes)
# UPDATE src/app/app.module.ts (1897 bytes)
```

## Problems

### Disabled ion-button still allows clicks.

@ionic/angular: 4.0.0-alpha.7

```html
    <ion-item>
      <ion-button (click)="doListenForAuth()"
                  color="primary"
                  [disabled]="authIsAuthorized$ | async"
                  fill="outline">Listen For Auth</ion-button>
    </ion-item>
```
