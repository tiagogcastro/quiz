export interface AlternativeProps {
  id: string;
  text: string;
  isCorrect: boolean;
}

export class Alternative {
  private constructor(private props: AlternativeProps) { }

  static create(props: AlternativeProps): Alternative {
    return new Alternative(props);
  }

  get id(): string {
    return this.props.id;
  }

  get text(): string {
    return this.props.text;
  }

  get isCorrect(): boolean {
    return this.props.isCorrect;
  }
}
