```mermaid
erDiagram

User {
	string id
	string email
}

Profile {
	string lastActive
}

PermissionTag {
  string id
  string name
}

Workspace {
  string id
  string name
}

Page {
  string id
  string name
  string pageOrder
  string blockOrder
}

Block {
  string id
  string type
  json properties
}

User ||--o| Profile: has
Profile ||--o{ Workspace : contains
Profile ||--o{ PermissionTag : contains
Workspace ||--o{ PermissionTag : contains
Workspace ||--o{ Page : contains
Page ||--o{ Block : contains
Page ||--o{ Page : contains
Page ||--o{ PermissionTag : contains
Block ||--o{ PermissionTag : contains
```
