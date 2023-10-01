export default interface Callback {
    onSuccess?: () => void;
    onError?: (e: Error) => void;
}
