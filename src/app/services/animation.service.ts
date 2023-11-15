import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  // Animation Paths
  private readonly loadingAnimationPath = './../assets/animations/fetching.json'
  private readonly noDataAnimation = './../assets/animations/no_data.json'

  getLoadingAnimationPath(): string {
    return this.loadingAnimationPath;
  }

  getNoDataAnimationPath(): string {
    return this.noDataAnimation;
  }
  
}
