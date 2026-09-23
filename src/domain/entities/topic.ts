interface TopicProps {
  id: string;
  name: string;
}

export class Topic {
  private constructor(private props: TopicProps) { }

  static create(props: TopicProps): Topic {
    return new Topic(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }
}