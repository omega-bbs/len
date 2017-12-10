import {
  Column,
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

export class User {
  // basic columns
  @PrimaryGeneratedColumn() public id: number

  @Column() public username: string

  @Column() public displayName: string

  @Column() public email: string

  @Column() public bio: string

  @Column() public avatarType: UserAvatarType

  @Column() public lastLoggedInAt: Date

  @Column() public createdAt: Date

  // relationships
  @OneToMany(type => File, file => file.usedInUser)
  public avatarFiles: File[]

  @OneToMany(type => Post, post => post.author)
  public posts: Post[]

  @OneToMany(type => Comment, comment => comment.author)
  public comments: Comment[]

  @OneToOne(type => File)
  @JoinColumn()
  public currentAvatarFile: File

  @ManyToOne(type => Role, role => role.users)
  public role: Role

  // calculated fileds
  public getAvatarUrl(): string {
    const methods = {
      [UserAvatarType.file]: this.getAvatarUrlFile,
      [UserAvatarType.gravatar]: this.getAvatarUrlGravatar,
      [UserAvatarType.unset]: this.getAvatarUrlUnset
    }
    return methods[this.avatarType].call(this)
  }

  private getAvatarUrlGravatar(): string {
    return 'https://gravatar.com'
  }

  private getAvatarUrlFile(): string {
    return this.currentAvatarFile.getUrl()
  }

  private getAvatarUrlUnset(): string {
    return 'about:blank'
  }
}
