import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export abstract class HttpBackendService {

  protected constructor(
    private httpService: HttpService
  ) {
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    const axiosConfig = config;

    return this.httpService.get<T>(url, axiosConfig)
      .pipe(map(this.extractData));
  }

  public post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Observable<T> {
    const axiosConfig = config;

    return this.httpService.post<T>(url, data, axiosConfig)
      .pipe(map(this.extractData));
  }

  public put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Observable<T> {
    const axiosConfig = config;

    return this.httpService.put<T>(url, data, axiosConfig)
      .pipe(map(this.extractData));
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Observable<T> {
    const axiosConfig = config;

    return this.httpService.delete<T>(url, axiosConfig)
      .pipe(map(this.extractData));
  }

  private extractData = <T>(resp: AxiosResponse<T>): T => resp?.data;

}
