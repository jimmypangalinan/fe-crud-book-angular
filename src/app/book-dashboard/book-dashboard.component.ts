import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { BookModel } from './book-dash board.model';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {

  formValue !: FormGroup;
  bookModelObj: BookModel = new BookModel();
  bookData !: any;
  showSave !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title: [''],
      author: [''],
      isbn: ['']
    })
    this.getAllBook();
  }

  clickAddBook(){
    this.formValue.reset();
    this.showSave = true;
    this.showUpdate = false;
  }

  // add new book
  postBookDetails() {
    this.bookModelObj.title = this.formValue.value.title;
    this.bookModelObj.author = this.formValue.value.author;
    this.bookModelObj.isbn = this.formValue.value.isbn;

    this.api.postBook(this.bookModelObj)
      .subscribe(res => {
        console.log(res);
        // alert("Book added successfully")
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllBook();
      },
        err => {
          alert("Something Wrong")
        })
  }

  // get books from json-server
  getAllBook() {
    this.api.getBooks()
      .subscribe(res => {
        this.bookData = res;
      })
  }

  // delete book by id
  deleteBook(row: any){
    this.api.deleteBook(row.id)
    .subscribe(res=>{
      alert("Book Deleted")
      this.getAllBook();
    })
  }


  // show data by id 
  onEditBook(row: any){

    this.showSave = false;
    this.showUpdate = true;

    this.bookModelObj.id = row.id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['isbn'].setValue(row.isbn);
  }


  // update data by id after show by button edit
  updateBookDetails(){
    this.bookModelObj.title = this.formValue.value.title;
    this.bookModelObj.author = this.formValue.value.author;
    this.bookModelObj.isbn = this.formValue.value.isbn;

    this.api.updateBook(this.bookModelObj, this.bookModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllBook();
    })
  }

}
