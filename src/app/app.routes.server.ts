import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path : "brand-details/:brandtId",
    renderMode : RenderMode.Server
  },
  {
    path : "product-details/:productId",
    renderMode : RenderMode.Server
  },
  {
    path : "order/:cartId",
    renderMode : RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
