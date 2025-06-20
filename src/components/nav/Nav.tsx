import styled from "styled-components";
import {DodamShape, DodamTypography} from "@b1nd/dds-web";
import {documentNormalizedTree} from "../../store/docs/docs.store";
import {useRecoilValue} from "recoil";
import {useNavigate} from "react-router-dom";
import type {ItemNode} from "../../types/sidebar/sidebar.type";

interface NavItemProps {
	path: string;
	description: string;
}

type NavItem = {
	item: ItemNode;
	description: string;
}

interface NavProps {
	nav: NavItemProps[];
}

export default function Nav({nav}: NavProps) {
	const navigate = useNavigate();
    const nodes = useRecoilValue(documentNormalizedTree).byId;

	const items: NavItem[] = nav.map(item => {
		return {
			item: nodes[item.path],
			description: item.description,
		};
	})

	return (
        <NavContainer>
	        {
				items.map(node => (
					<NavItem onClick={() => navigate('/' + node.item.id)}>
						<NavItemTitle>{node.item.title}</NavItemTitle>
						<p>{node.description}</p>
					</NavItem>
					)
				)
	        }
        </NavContainer>
    )
}

const NavItemTitle = styled.p`
    ${DodamTypography.Label.Bold}
`

const NavItem = styled.div`
    border: 1px solid ${({ theme }) => theme.lineNormal};
    ${DodamShape.ExtraSmall};
    display: flex;
    flex-direction: column;
    flex: 1;
	padding: 1em;
	gap: 0.5em;
    user-select: none;
	
	&:hover {
		cursor: pointer;
		border: 1px solid ${({ theme }) => theme.primaryAlternative};
	}
`

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 80px;
    width: 55%;
    gap: 13px;
    ${DodamShape.Small};
    * {
        margin: 0 !important;
    }
`