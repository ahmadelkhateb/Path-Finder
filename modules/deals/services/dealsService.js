const { BAD_REQUEST } = require("http-status-codes");
const ErrorResponse = require("../../../common/utils/errorResponse");
const hoursMinutesFormate = require("../../../common/utils/hoursMinutesFormate");

class DealsService {

    constructor(deals, variant) {
        this.uniqueNodes = new Set();
        this.graph = {};
        this.deals = deals.map(deal => {
            // storing unique cities in a set
            this.uniqueNodes.add(deal.departure);
            this.uniqueNodes.add(deal.arrival);
            return deal
        })
    }    

    variantsFunctionMapper = {
        'fastest': this._DurationFormat,
        'cheapest': this._CostFormat, 
    }

    // Class Methods

    getCities() {
        return this.uniqueNodes
    }
    /**
     * 
     * @param {String} from 
     * @param {String} to 
     */
    lowest_weight_deal(from, to, variant) {
        // Validate Params 
        this._validate(from, to, variant)
        // Formating graphs 
        this._formatGraphs(variant);
        const startingNode = from;
        const finishingNode = to;
        const processed = [];
        const parents = {};
        const costs = {};

        // No need to process the destination node
        delete this.graph[finishingNode];

        this.uniqueNodes.forEach(node => {
            if(node !== from) {
                costs[node] = Infinity;
                parents[node] = null
            }

            // Set initial costs of the neighbour cities to the startingNode
            if(this.graph[startingNode][node]) {
                costs[node] = this.graph[startingNode][node].amount;
                parents[node] = startingNode;
            }
        })

        let lowest_weight_node = this._find_lowest_cost_node(costs, processed);
        if (lowest_weight_node == finishingNode) return parents;
        while (lowest_weight_node) {
            let cost = costs[lowest_weight_node];
            if(costs[finishingNode] && cost > costs[finishingNode]) break;
            let neighbors = this.graph[lowest_weight_node]
            for (let key in neighbors) {
                let newCost = cost + neighbors[key].amount;
                if (costs[key] > newCost) {
                    costs[key] = newCost;
                    parents[key] = lowest_weight_node;
                }
            }
            processed.push(lowest_weight_node);
            lowest_weight_node = this._find_lowest_cost_node(costs, processed);
        }

        if(!parents[finishingNode]) throw new ErrorResponse('There no current deals for you', BAD_REQUEST)

        // Formatting the result deals
        const dealsRef = []
        let childNode = finishingNode;
        let parentNode = parents[childNode];
        while (parentNode) {
            dealsRef.unshift(this.graph[parentNode][childNode].ref);
            childNode = parentNode;
            parentNode = parents[childNode]
        } 

        return this._formatResponse(dealsRef)
    }


    // Private functions

    _formatResponse(dealsRefs) {
        let totalCost = 0;
        let totalDuration = 0;
        const dealsData = dealsRefs.map(ref => {
            let deal = this.deals.filter(deal => deal.reference == ref)[0];
            totalCost += this._CostFormat(deal);
            totalDuration += this._DurationFormat(deal);
            return deal;
        });
        totalDuration = hoursMinutesFormate(totalDuration);
        return {
            deals: dealsData,
            totalCost,
            totalDuration
        }
    }
    /**
     * 
     * @param {String} from 
     * @param {String} to 
     * @param {String} variant 
     */
    _validate(from, to, variant) {
        if(!this.variantsFunctionMapper[variant]) {
            throw new ErrorResponse('This filter is not implemented', BAD_REQUEST)
        }
        if(!from || !to) {
            throw new ErrorResponse('Departure and arrival cities are required ', BAD_REQUEST)
        }
        const uniqueCities = Array.from(this.uniqueNodes)
        if(!uniqueCities.includes(from) || !uniqueCities.includes(to)) {
            throw new ErrorResponse('There no current deals for you', BAD_REQUEST)
        }
    }
    /**
     * 
     * @param {String} variant cheapest || fastest
     */
    _formatGraphs(variant) {
        // Reseting Graph
        this.graph = {};

        this.deals = this.deals.map(deal => {
            // Add the weight property to deal object
            deal.weight = this.variantsFunctionMapper[variant](deal);

            // Formatting a graph hashtable
            this.graph[deal.departure] = this.graph[deal.departure] || {};
            if (
                !this.graph[deal.departure][deal.arrival] ||
                this.graph[deal.departure][deal.arrival].amount > deal.weight
            ) {
                this.graph[deal.departure][deal.arrival] = {
                    amount: deal.weight,
                    ref: deal.reference
                }
            }
            return deal
        })
    }
    /**
     * 
     * @param {Array} costs -- Array of each node and its weight
     * @param {Array} processed -- Array of processed nodes
     */
    _find_lowest_cost_node(costs, processed) {
        let lowest_cost = Infinity;
        let lowest_cost_node = null;
        for (let node in costs) {
            let cost = costs[node]
            if (cost < lowest_cost && !processed.includes(node)){
                lowest_cost = cost
                lowest_cost_node = node
            }
                
        }
        return lowest_cost_node
    }

    /**
     * Reformat deals to easier structure according to wight of cost
     * @param {Deal} deals
     */
    _CostFormat(deal) {
        return deal.cost * ((100 - deal.discount) / 100)
    }

    /**
     * Reformat deal to easier structure according to wight of duration
     * @param {Deal} deal
     */
    _DurationFormat(deal) {
        return (parseInt(deal.duration.h) * 60) + parseInt(deal.duration.m);
    }
}

module.exports = DealsService;