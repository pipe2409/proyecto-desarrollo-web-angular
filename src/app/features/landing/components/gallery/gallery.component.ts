import { Component } from '@angular/core';
import { GalleryItem } from '../../../../modelo/gallery-item';
import { GALLERY_DATA } from '../../data/gallery.data';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  galleryItems: GalleryItem[] = GALLERY_DATA;
  selectedItem: GalleryItem | null = null;

  openLightbox(item: GalleryItem): void {
    this.selectedItem = item;
  }

  closeLightbox(): void {
    this.selectedItem = null;
  }
}