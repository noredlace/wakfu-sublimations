import { Header, HeaderName, HeaderNavigation, HeaderMenuItem } from "@carbon/react"
import type { SublimationType } from "../App"

interface HeaderComponentProps {
  activeTab: SublimationType
  onTabChange: (tab: SublimationType) => void
}

export default function HeaderComponent({ activeTab, onTabChange }: HeaderComponentProps) {
    return (
        <Header>
            <HeaderName prefix="Wakfu Sublimations">
            </HeaderName>
            <HeaderNavigation aria-label="Sublimation Types">
                <HeaderMenuItem 
                    isCurrentPage={activeTab === 'regular'}
                    onClick={() => onTabChange('regular')}
                >
                    Sublimations
                </HeaderMenuItem>
                <HeaderMenuItem 
                    isCurrentPage={activeTab === 'epic'}
                    onClick={() => onTabChange('epic')}
                >
                    Epic Sublimations
                </HeaderMenuItem>
                <HeaderMenuItem 
                    isCurrentPage={activeTab === 'relic'}
                    onClick={() => onTabChange('relic')}
                >
                    Relic Sublimations
                </HeaderMenuItem>
            </HeaderNavigation>
        </Header>
    )
}

