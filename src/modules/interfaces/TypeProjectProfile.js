import type {TypeTeam} from "./TypeTeam";
import type {TypeProject} from "./TypeProject";
import type {TypePeople} from "./TypePeople";

export interface TypeProjectProfile extends TypeProject{
	creator : TypePeople;
	manager : TypePeople;
	teams : TypeTeam[];
}

