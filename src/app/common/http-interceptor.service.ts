import { Injectable } from '@angular/core';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import {AuthService} from "./../user/auth.service";

@Injectable()
export class HttpInterceptor implements Interceptor {

  constructor(private authService : AuthService){}

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {

    request.options.headers.set('tokenId', this.authService.getTokenId() ? this.authService.getTokenId() : ' ');

    console.info(request);

    return request;
    /*
     You can return:
     - Request: The modified request
     - Nothing: For convenience: It's just like returning the request
     - <any>(Observable.throw("cancelled")): Cancels the request, interrupting it from the pipeline, and calling back 'interceptAfter' in backwards order of those interceptors that got called up to this point.
     */
  }

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {

    console.info(response);

    return response;
    /*
     You can return:
     - Response: The modified response
     - Nothing: For convenience: It's just like returning the response
     */
  }

}
