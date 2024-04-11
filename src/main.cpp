#include <emscripten.h>
#include <emscripten/bind.h>
#include <cstdio>
#include <cstdlib>
#include <cstring>

template <typename T>
size_t to_mb(T num) {
  return num * 1024 * 1024;
}

template <typename T>
T int_to_ptr(intptr_t ptr) {
  return reinterpret_cast<T>(ptr);
}

template <typename T>
intptr_t ptr_to_int(T ptr) {
  return reinterpret_cast<intptr_t>(ptr);
}

emscripten::val get_buffer(intptr_t buffer_ptr, size_t buffer_size) {
  return emscripten::val(emscripten::typed_memory_view<uint8_t>(to_mb(buffer_size), int_to_ptr<uint8_t*>(buffer_ptr)));
}

intptr_t allocate_memory(size_t to_allocate) {
  auto size = to_mb(to_allocate);
  void* allocated_memory = malloc(size);
  if (allocated_memory == NULL) {
    printf("Memory allocation error\n");
    return 0;
  }

  memset(allocated_memory, 'a' + rand() % 26, size);
  return ptr_to_int(allocated_memory);
}

EMSCRIPTEN_BINDINGS() {
  emscripten::function("allocate_memory", &allocate_memory);
  emscripten::function("get_buffer", &get_buffer, emscripten::allow_raw_pointers());
}