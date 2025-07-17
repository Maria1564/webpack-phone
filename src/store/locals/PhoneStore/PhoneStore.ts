import { MaskPhone } from 'components/common/IPhoneInput/type';
import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'store/hooks';

type PrivateFields = '_phoneOutput' | '_currentMask' | '_digitPhone' | '_maskInfo' | '_isValid';

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
  private _isValid: boolean | null = null;

  constructor(value: string, maskInfo: MaskPhone[]) {
    this._value = value.trim();
    this._maskInfo = maskInfo;
    this.setCurrentMask(maskInfo[0]);

    makeObservable<PhoneStore, PrivateFields>(this, {
      _currentMask: observable,
      _maskInfo: observable,
      _phoneOutput: observable,
      _digitPhone: observable,
      _isValid: observable,
      formatPhoneNumber: action,
      extractDigitsToArray: action,
      setDigitPhone: action,
      setCurrentMask: action,
      validatePhoneNumber: action,
      phoneOutput: computed,
      currentMaskSplit: computed,
      digitPhone: computed,
      maskInfo: computed,
      isValid: computed,
      maskIndexMap: computed,
    });
  }

  get phoneOutput(): string {
    return this._phoneOutput;
  }

  get currentMaskSplit(): string[] {
    return this._currentMask.mask.split('');
  }

  get maskIndexMap(): { [key: string]: { index: number } } {
    const arrMaskSplit = this.currentMaskSplit;
    let index = 0;
    return arrMaskSplit.reduce((acc, elem, currentIndex) => {
      if (elem !== '*') {
        return acc;
      }

      return {
        ...acc,
        [currentIndex]: {
          index: index++,
        },
      };
    }, {});
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

  get isValid(): boolean | null {
    return this._isValid;
  }

  extractDigitsToArray = (): void => {
    this._digitPhone = [];
    if (this._value) {
      for (let i = this._value.length - 1; i > 0; i--) {
        if (!isNaN(Number(this._value[i])) && this._value[i] !== ' ') {
          this._digitPhone = [this._value[i], ...this._digitPhone];
        }

        if (this._digitPhone.length === this._maskStarsCount) {
          break;
        }
      }
    }
  };

  setDigitPhone = (index: number, value: string): boolean => {
    if (isNaN(Number(value))) {
      return false;
    }

    const updated = [...this.digitPhone];
    updated[index] = value;
    this._digitPhone = updated;
    return true;
  };

  formatPhoneNumber = () => {
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
  };

  setCurrentMask = (selectedMask: MaskPhone) => {
    this._currentMask = selectedMask;
    this._maskStarsCount = selectedMask.mask.split('').filter((item) => item == '*').length;

    this.extractDigitsToArray();
  };

  validatePhoneNumber = () => {
    const checkedDigitPhone = this._digitPhone.filter((num) => num).length;

    if (checkedDigitPhone === this._maskStarsCount) {
      this._isValid = true;
    } else {
      this._isValid = false;
    }
  };

  destroy = () => {};
}
