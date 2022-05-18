import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { BookModel } from './book-dash board.model';
import Swal from 'sweetalert2'

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

  clickAddBook() {
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Succes Add New Book',
          showConfirmButton: false,
          timer: 2000
        })
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
        console.log(res);

      })
  }

  // delete book by id
  deleteBook(row: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete the book!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteBook(row._id)
          .subscribe(res => {
            this.getAllBook();
          })
        Swal.fire(
          'Deleted!',
          'Book has been deleted.',
          'success'
        )
      }
    })



  }


  // show data by id 
  onEditBook(row: any) {

    this.showSave = false;
    this.showUpdate = true;

    this.bookModelObj._id = row._id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['isbn'].setValue(row.isbn);
  }


  // update data by id after show by button edit
  updateBookDetails() {
    this.bookModelObj.title = this.formValue.value.title;
    this.bookModelObj.author = this.formValue.value.author;
    this.bookModelObj.isbn = this.formValue.value.isbn;

    this.api.updateBook(this.bookModelObj, this.bookModelObj._id)
      .subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated successfully',
          showConfirmButton: false,
          timer: 2000
        })
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getAllBook();
      })
  }

}
