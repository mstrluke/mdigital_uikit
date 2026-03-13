declare module 'qrcode' {
  interface QRCodeModules {
    size: number
    get(row: number, col: number): number
  }
  interface QRCodeResult {
    modules: QRCodeModules
    version: number
    errorCorrectionLevel: { bit: number }
    maskPattern: number
  }
  function create(text: string, options?: { errorCorrectionLevel?: string; version?: number }): QRCodeResult
  export { create }
}
