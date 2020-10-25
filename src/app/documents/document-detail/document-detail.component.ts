import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from '../../wind-ref.service.ts.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;
  id: string;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService) {

    this.nativeWindow = windRefService.getNativeWindow();

              }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
      }
    )

    // this.router.events.subscribe(
    //   ()=>{
    //     let id: string = this.route.snapshot.params.id;
    //     this.document = this.documentService.getDocument(id);
    //   }
    // )
    
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
    
  }
  

}
