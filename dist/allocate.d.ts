// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
}

interface EmbindModule {
  allocate_memory(_0: number): number;
  get_buffer(_0: number, _1: number): any;
}
export type MainModule = WasmModule & EmbindModule;
