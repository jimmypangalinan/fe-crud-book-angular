# Step by step develop simple CRUD with jason-server

## 1. Create New Project

open cmd as administrator enter your dir and enter your dir the app we can save, type the code here:

`ng new crud-book-list`

- kita akan dminta untuk menembahkan `Angular routing` (y/n) : `yes`
- untuk stylesheet pada kasus ini menggunka `CSS` : enter sampai aplikasi berhasil di instal.

Masuk kedalam folder app dan buka buka `VSC` untuk meulai membangun aplikasinya.

ruang kerja sudah berhasil dibutakna dan berikut strure filenya :

- `.editorconfig` : file konfigura untuk code editor
- `.gitignore` : file yang senga tidak dilacak yang akan di abaikan oleh git

- `angular.json` : semua konfigurasi cli secara default berisi informasi arsitekture dari suatu project, termasuk opsi-opsi settingan dasar sebuah services serta uji coba melalui `testlink` serta memberikan `assets` dan `styling` yang ingin digunakan dengan cara mendaftrakannya masuk.
- `package.json` : untuk mengatur dependecines dari package npm yang berhaisl diinstal yang secara otomatis di install di node_modules

- `src` : sebagi sumber file aplikasi
- `tsconfig.ts` : file configurasi dasar typescript
- `tslint.json` : untukk menganalisis code untuk program typescriptnya sebagai contoh untuk memeriksa bagian error.


### Folder utama `SRC`

untuk folder `src/app` berisi :

- `app` : folder yang berisi template atau bisa dikatakan component utamanya yang terdiri dari :
1. `app.component.css` : untuk file styling
2. `app.component.html` : sebagai halam tampilan yang bisa juga dsebut `view`
3. `app.component.spec.ts` : file untuk melakukan pengujian
4. `app.component.ts` :  file yang berisi logika untuk component utama (root) yang menajdi akar rout untuk semua tampilan pada SPA di angular.

5. `app-routing.module.ts` : file perutean
6. `app.module.ts` :