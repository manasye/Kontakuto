export default interface Callback {
  onSuccess?: (param?: unknown) => void;
  onError?: (e: Error) => void;
}
