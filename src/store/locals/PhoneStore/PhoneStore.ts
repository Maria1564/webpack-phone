import { MaskPhone } from '@/components/common/IPhoneInput/type';
import { ILocalStore } from '@/store/hooks';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_phoneOutput' | '_currentMask' | '_digitPhone' | '_maskInfo' | '_isValidate';

export class PhoneStore implements ILocalStore {
  private _value: string | null = null;
  private _maskInfo: MaskPhone[] = [];
  private _currentMask: MaskPhone = {
    key: '',
    name: '',
    emoji: '',
    prefix: '',
    mask: '(***) - *** - ** - **',
  }; //текущая маска
  private _digitPhone: string[] = [];
  private _maskStarsCount: number = 0;
  private _phoneOutput: string = ''; //итоговый результат (например: +7(984)934-43-23)
  private _isValidate: boolean | null = null;

  constructor(value: string, maskInfo: MaskPhone[]) {
    this._value = value.trim();
    this._maskInfo = maskInfo;
    this.setCurrentMask(maskInfo[0]);

    makeObservable<PhoneStore, PrivateFields>(this, {
      _currentMask: observable,
      _maskInfo: observable,
      _phoneOutput: observable,
      _digitPhone: observable,
      _isValidate: observable,
      formatPhoneNumber: action,
      extractDigitsToArray: action,
      setDigitPhone: action,
      setCurrentMask: action,
      validatePhoneNumber: action,
      phoneOutput: computed,
      currentMaskSplit: computed,
      digitPhone: computed,
      maskInfo: computed,
      isValidate: computed,
    });
  }

  get phoneOutput(): string {
    return this._phoneOutput;
  }

  get currentMaskSplit(): string[] {
    return this._currentMask.mask.split('');
  }

  get currentMask(): MaskPhone {
    return this._currentMask;
  }

  get digitPhone(): string[] {
    return this._digitPhone;
  }

  get maskInfo(): MaskPhone[] {
    return this._maskInfo;
  }

  get isValidate(): boolean | null {
    return this._isValidate;
  }

  extractDigitsToArray(): void {
    this._digitPhone = [];
    if (!this._value) return;
    for (let i = this._value.length - 1; i > 0; i--) {
      if (this._value[i].trim() !== '' && !isNaN(Number(this._value[i]))) {
        this._digitPhone = [this._value[i], ...this._digitPhone];
      }

      if (this._digitPhone.length === this._maskStarsCount) {
        break;
      }
    }
  }

  setDigitPhone(index: number, value: string) {
    const updated = [...this.digitPhone];
    updated[index] = value;
    this._digitPhone = updated;
  }

  formatPhoneNumber() {
    const lenPhone = this._digitPhone.filter((num) => num).length;
    if (lenPhone !== this._maskStarsCount) {
      return;
    }

    let pointer = 0;
    let index = 0;
    this._phoneOutput = this._currentMask.mask;

    while (pointer < this._currentMask.mask.length) {
      if (this._currentMask.mask[pointer] === '*') {
        this._phoneOutput =
          this._phoneOutput.slice(0, pointer) +
          this._digitPhone[index] +
          this._phoneOutput.slice(pointer + 1);
        index++;
      }
      pointer++;
    }

    this._phoneOutput = this._currentMask.prefix + this._phoneOutput;
  }

  setCurrentMask(selectedMask: MaskPhone) {
    this._currentMask = selectedMask;
    this._maskStarsCount = selectedMask.mask.split('').filter((item) => item == '*').length;

    this.extractDigitsToArray();
  }

  validatePhoneNumber() {
    const checkedDigitPhone = this._digitPhone.filter((num) => num).length;

    if (checkedDigitPhone === this._maskStarsCount) {
      this._isValidate = true;
    } else {
      this._isValidate = false;
    }
  }

  destroy() {}
}
