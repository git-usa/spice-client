import type {TypeProject} from "./TypeProject";
import type {TypePeople} from "./TypePeople";
import type {TypeTeam} from "./TypeTeam";

export interface TypeProjectProfile extends TypeProject{
	creator : TypePeople;
	manager : TypePeople;
	teams : TypeTeam[];
}
