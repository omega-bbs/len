import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Comment } from './Comment'
import { File } from './File'
import { Post } from './Post'
import { Role } from './Role'
import { Topic } from './Topic'

export enum UserAvatarType {
  file = 1,
  gravatar,
  unset
}

@Entity()
export class User {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public username: string

  @Column('text') public displayName: string

  @Column('text') public email: string

  @Column('text') public bio: string

  @Column() public avatarType: UserAvatarType

  @Column() public lastLoggedInAt: Date

  @Column() public createdAt: Date

  // relationships
  @OneToMany(type => File, file => file.usedInUser)
  public avatarFiles: Promise<File[]>

  @OneToMany(type => File, file => file.author)
  public files: Promise<File[]>

  @OneToMany(type => Post, post => post.author)
  public posts: Promise<Post[]>

  @OneToMany(type => Comment, comment => comment.author)
  public comments: Promise<Comment[]>

  @OneToOne(type => File)
  @JoinColumn()
  public currentAvatarFile: Promise<File>

  @ManyToOne(type => Role, role => role.users)
  public role: Promise<Role>

  // calculated fileds
  /** get user's current avatar public url */
  public async getAvatarUrl(): Promise<string> {
    const methods = {
      [UserAvatarType.file]: this.getAvatarUrlFile,
      [UserAvatarType.gravatar]: this.getAvatarUrlGravatar,
      [UserAvatarType.unset]: this.getAvatarUrlUnset
    }
    return methods[this.avatarType].call(this)
  }

  private getAvatarUrlGravatar(): Promise<string> {
    return Promise.resolve('https://gravatar.com')
  }

  private async getAvatarUrlFile(): Promise<string> {
    return (await this.currentAvatarFile).getUrl()
  }

  private async getAvatarUrlUnset(): Promise<string> {
    return 'about:blank'
  }
}
