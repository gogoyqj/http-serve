/// <reference path="../typings/ecstatic/index.d.ts" />
/**
 * @description 简单的静态文件服务器
 */
import http from 'http';
import ecstatic from 'ecstatic';

export interface IHttpServerOptions {
  /** 静态文件目录，默认是当前目录 */
  root?: string;
  /** 缓存时间 */
  cache?: number;
}

/** 对外暴露的方法 */
export interface IHttpServer {
  /** 启动服务 */
  listen(port: number): void;
  /** 关闭服务 */
  close(): void;
}

export default class HttpServer implements IHttpServer {
  private server: http.Server;
  constructor(options: IHttpServerOptions) {
    const root = options.root || process.cwd();
    this.server = http.createServer(ecstatic({
      root,
      cache: options.cache === undefined ? 3600 : options.cache,
      showDir: true,
      defaultExt: 'html',
      gzip: true,
      contentType: 'application/octet-stream',
    }));
  }

  public listen(port: number) {
    this.server.listen(port);
  }

  public close() {
    return this.server.close();
  };
}