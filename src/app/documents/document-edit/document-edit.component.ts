import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') docForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  subscription: Subscription;
  id: string;


  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) { 
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);

        if (!this.originalDocument) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument)
    }
    this.onCancel();

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
