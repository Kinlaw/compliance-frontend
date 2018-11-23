import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';
import some from 'lodash/some';
import propTypes from 'prop-types';
import { PageHeader, PageHeaderTitle, Main, routerParams } from '@red-hat-insights/insights-frontend-components';
import ComplianceTabs from '../ComplianceTabs/ComplianceTabs';

const CompliancePolicies = asyncComponent(() =>
    import(/* webpackChunkName: "CompliancePolicies" */ '../CompliancePolicies/CompliancePolicies')
);
const ComplianceSystems = asyncComponent(() =>
    import(/* webpackChunkName: "ComplianceSystems" */ '../ComplianceSystems/ComplianceSystems')
);

const PolicyDetails = asyncComponent(() =>
    import(/* webpackChunkName: "PolicyDetails" */ '../PolicyDetails/PolicyDetails')
);

export const paths = {
    compliance: '/',
    compliancePolicies: '/policies',
    complianceSystems: '/systems',
    policyDetails: '/policies/:policy_id'
};

const Compliance = props => {
    let path = props.location.pathname;
    return (
        <React.Fragment>
            <PageHeader>
                <PageHeaderTitle title="Compliance" />
            </PageHeader>
            <Main>
                <ComplianceTabs>
                    <Switch>
                        <Route exact path={paths.compliancePolicies} component={CompliancePolicies} />
                        <Route exact path={paths.complianceSystems} component={ComplianceSystems} />
                        <Route exact path={ paths.policyDetails } component={ PolicyDetails } />
                        <Route
                            render={() => (some(paths, p => p === path) ? null : <Redirect to={paths.compliance} />)}
                        />
                    </Switch>
                </ComplianceTabs>
            </Main>
        </React.Fragment>
    );
};

Compliance.propTypes = {
    location: propTypes.object.isRequired
};

export default routerParams(Compliance);
